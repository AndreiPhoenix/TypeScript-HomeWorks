import inquirer from 'inquirer';
import { AccountManager } from './AccountManager';
import { Account } from './Account';
import { Transaction } from './Transaction';
import { TransactionType } from '../interfaces/TransactionType';
import * as fs from 'fs';
import * as path from 'path';

export class ApplicationController {
  private accountManager: AccountManager;

  constructor() {
    this.accountManager = new AccountManager();
    this.initializeSampleData();
  }

  private initializeSampleData(): void {
    // Создаем тестовые счета
    const account1 = new Account('Основной счет');
    const account2 = new Account('Сбережения');

    // Добавляем тестовые транзакции
    account1.addTransaction(new Transaction(1000, TransactionType.INCOME, 'Зарплата', new Date('2024-01-15')));
    account1.addTransaction(new Transaction(200, TransactionType.EXPENSE, 'Продукты', new Date('2024-01-16')));
    account1.addTransaction(new Transaction(50, TransactionType.EXPENSE, 'Транспорт', new Date('2024-01-17')));

    account2.addTransaction(new Transaction(5000, TransactionType.INCOME, 'Премия', new Date('2024-01-10')));
    account2.addTransaction(new Transaction(1000, TransactionType.EXPENSE, 'Курсы', new Date('2024-01-12')));

    this.accountManager.addAccount(account1);
    this.accountManager.addAccount(account2);
  }

  public async start(): Promise<void> {
    console.clear();
    console.log('💰 Budget Tracker CLI\n');
    await this.showMainMenu();
  }

  private async showMainMenu(): Promise<void> {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Главное меню:',
        choices: [
          { name: '📋 Просмотр всех счетов', value: 'list' },
          { name: '➕ Создать новый счет', value: 'create' },
          { name: '🚪 Выход', value: 'exit' }
        ]
      }
    ]);

    switch (action) {
      case 'list':
        await this.showAccountsList();
        break;
      case 'create':
        await this.createAccount();
        break;
      case 'exit':
        console.log('До свидания!');
        process.exit(0);
    }
  }

  private async showAccountsList(): Promise<void> {
    console.clear();
    console.log('📋 Список счетов:\n');
    
    if (this.accountManager.accounts.length === 0) {
      console.log('Нет доступных счетов');
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Выберите действие:',
          choices: [
            { name: 'Назад', value: 'back' }
          ]
        }
      ]);
      
      if (action === 'back') {
        await this.showMainMenu();
      }
      return;
    }

    const choices = this.accountManager.accounts.map(account => ({
      name: `${account.name} (Баланс: $${account.balance}, Транзакций: ${account.transactions.length})`,
      value: account.id
    }));

    choices.push({ name: '⬅️ Назад', value: 'back' });

    const { accountId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'accountId',
        message: 'Выберите счет:',
        choices
      }
    ]);

    if (accountId === 'back') {
      await this.showMainMenu();
    } else {
      await this.watchAccount(accountId);
    }
  }

  private async createAccount(): Promise<void> {
    console.clear();
    console.log('➕ Создание нового счета\n');

    const { accountName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'accountName',
        message: 'Введите название счета:',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Название счета не может быть пустым';
          }
          if (this.accountManager.getAccountByName(input.trim())) {
            return 'Счет с таким названием уже существует';
          }
          return true;
        }
      }
    ]);

    const newAccount = new Account(accountName.trim());
    this.accountManager.addAccount(newAccount);

    console.log(`\n✅ Счет "${accountName}" успешно создан!`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.showMainMenu();
  }

  private async watchAccount(accountId: string): Promise<void> {
    const account = this.accountManager.getAccount(accountId);
    if (!account) {
      console.log('Счет не найден');
      await this.showMainMenu();
      return;
    }

    console.clear();
    console.log(account.getSummaryString());
    console.log('\n📊 Транзакции:');
    
    if (account.transactions.length === 0) {
      console.log('Нет транзакций');
    } else {
      account.transactions.forEach((transaction, index) => {
        console.log(`${index + 1}. ${transaction.toString()}`);
      });
    }

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: '\nВыберите действие:',
        choices: [
          { name: '➕ Добавить транзакцию', value: 'addTransaction' },
          { name: '🗑️ Удалить транзакцию', value: 'removeTransaction' },
          { name: '💾 Экспорт в CSV', value: 'exportCSV' },
          { name: '❌ Удалить счет', value: 'deleteAccount' },
          { name: '⬅️ Назад к списку счетов', value: 'back' }
        ]
      }
    ]);

    switch (action) {
      case 'addTransaction':
        await this.addTransaction(accountId);
        break;
      case 'removeTransaction':
        await this.removeTransaction(accountId);
        break;
      case 'exportCSV':
        await this.exportTransactionsToCSV(accountId);
        break;
      case 'deleteAccount':
        await this.removeAccount(accountId);
        break;
      case 'back':
        await this.showMainMenu();
        break;
    }
  }

  private async addTransaction(accountId: string): Promise<void> {
    const account = this.accountManager.getAccount(accountId);
    if (!account) return;

    console.clear();
    console.log('➕ Добавление транзакции\n');

    const answers = await inquirer.prompt([
      {
        type: 'number',
        name: 'amount',
        message: 'Введите сумму:',
        validate: (input: number) => input > 0 ? true : 'Сумма должна быть больше 0'
      },
      {
        type: 'list',
        name: 'type',
        message: 'Выберите тип транзакции:',
        choices: [
          { name: '📈 Доход', value: TransactionType.INCOME },
          { name: '📉 Расход', value: TransactionType.EXPENSE }
        ]
      },
      {
        type: 'input',
        name: 'date',
        message: 'Дата (YYYY-MM-DD) [текущая дата]:',
        default: new Date().toISOString().split('T')[0],
        validate: (input: string) => {
          if (!input.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return 'Введите дату в формате YYYY-MM-DD';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Описание:',
        validate: (input: string) => input.trim() ? true : 'Описание не может быть пустым'
      }
    ]);

    const transaction = new Transaction(
      answers.amount,
      answers.type,
      answers.description,
      new Date(answers.date)
    );

    account.addTransaction(transaction);
    console.log('\n✅ Транзакция успешно добавлена!');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.watchAccount(accountId);
  }

  private async removeTransaction(accountId: string): Promise<void> {
    const account = this.accountManager.getAccount(accountId);
    if (!account || account.transactions.length === 0) {
      console.log('Нет транзакций для удаления');
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.watchAccount(accountId);
      return;
    }

    console.clear();
    console.log('🗑️ Удаление транзакции\n');

    const choices = account.transactions.map((transaction, index) => ({
      name: `${index + 1}. ${transaction.toString()}`,
      value: transaction.id
    }));
    
    choices.push({ name: '⬅️ Назад', value: 'back' });

    const { transactionId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'transactionId',
        message: 'Выберите транзакцию для удаления:',
        choices
      }
    ]);

    if (transactionId === 'back') {
      await this.watchAccount(accountId);
      return;
    }

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Вы уверены, что хотите удалить эту транзакцию?',
        default: false
      }
    ]);

    if (confirm) {
      const success = account.removeTransaction(transactionId);
      if (success) {
        console.log('\n✅ Транзакция успешно удалена!');
      } else {
        console.log('\n❌ Транзакция не найдена');
      }
    } else {
      console.log('\n❌ Удаление отменено');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.watchAccount(accountId);
  }

  private async removeAccount(accountId: string): Promise<void> {
    const account = this.accountManager.getAccount(accountId);
    if (!account) return;

    console.clear();
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Вы уверены, что хотите удалить счет "${account.name}" со всеми транзакциями?`,
        default: false
      }
    ]);

    if (confirm) {
      this.accountManager.removeAccount(accountId);
      console.log('\n✅ Счет успешно удален!');
    } else {
      console.log('\n❌ Удаление отменено');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.showMainMenu();
  }

  private async exportTransactionsToCSV(accountId: string): Promise<void> {
    const account = this.accountManager.getAccount(accountId);
    if (!account || account.transactions.length === 0) {
      console.log('Нет транзакций для экспорта');
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.watchAccount(accountId);
      return;
    }

    console.clear();
    console.log('💾 Экспорт транзакций в CSV\n');

    const { fileName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'fileName',
        message: 'Введите имя файла (без расширения):',
        default: `${account.name.replace(/\s+/g, '_')}_transactions`,
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Имя файла не может быть пустым';
          }
          if (!input.match(/^[a-zA-Z0-9_-]+$/)) {
            return 'Имя файла может содержать только буквы, цифры, дефисы и подчеркивания';
          }
          return true;
        }
      }
    ]);

    const csvContent = account.getTransactionsCSV();
    const filePath = path.join(process.cwd(), `${fileName}.csv`);

    try {
      fs.writeFileSync(filePath, csvContent, 'utf8');
      console.log(`\n✅ Файл успешно экспортирован: ${filePath}`);
    } catch (error) {
      console.log(`\n❌ Ошибка при экспорте файла: ${error}`);
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    await this.watchAccount(accountId);
  }
}
