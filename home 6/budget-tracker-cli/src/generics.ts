// Часть 1. Интерфейсы

// Интерфейс Identifiable с числовым полем id
export interface Identifiable {
    id: number;
}

// Интерфейс Describable с методом describe()
export interface Describable {
    describe(): string;
}

// Часть 2. Универсальный класс GenericStorage<T>
export class GenericStorage<T extends Identifiable> {
    // Приватный массив для хранения элементов
    private items: T[] = [];

    // Добавить элемент в хранилище
    add(item: T): void {
        this.items.push(item);
    }

    // Удалить элемент по id
    removeById(id: number): boolean {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        return this.items.length < initialLength;
    }

    // Получить элемент по id
    getById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }

    // Получить копию всех элементов
    getAll(): T[] {
        return [...this.items];
    }

    // Часть 3. Метод describeAll()
    describeAll(): void {
        this.items.forEach(item => {
            // Проверяем, реализует ли элемент интерфейс Describable
            if ('describe' in item && typeof (item as any).describe === 'function') {
                const describableItem = item as unknown as Describable;
                console.log(describableItem.describe());
            } else {
                console.log(`Элемент id: ${item.id} не содержит описания.`);
            }
        });
    }
}

// Часть 4. Класс Product
export class Product implements Identifiable, Describable {
    constructor(
        public id: number,
        public name: string,
        public price: number
    ) {}

    describe(): string {
        return `Product #${this.id}: ${this.name}, price: $${this.price}`;
    }
}

// Проверка решения
export function testGenerics(): void {
    console.log('\n=== Тестирование GenericStorage и Product ===\n');
    
    // Создаем экземпляр GenericStorage<Product>
    const productStorage = new GenericStorage<Product>();
    
    // Добавляем несколько продуктов
    productStorage.add(new Product(1, 'Laptop', 999.99));
    productStorage.add(new Product(2, 'Smartphone', 699.99));
    productStorage.add(new Product(3, 'Tablet', 399.99));
    
    console.log('Товары в хранилище:');
    productStorage.getAll().forEach(product => {
        console.log(`- ID: ${product.id}, Name: ${product.name}, Price: $${product.price}`);
    });
    
    console.log('\nОписания товаров:');
    productStorage.describeAll();
    
    // Тестирование getById
    const product = productStorage.getById(2);
    if (product) {
        console.log(`\nНайден товар по ID 2: ${product.describe()}`);
    }
    
    // Тестирование removeById
    const isRemoved = productStorage.removeById(1);
    console.log(`\nУдаление товара с ID 1: ${isRemoved ? 'успешно' : 'не удалось'}`);
    console.log('Осталось товаров:', productStorage.getAll().length);
    
    // Добавляем объект, который НЕ реализует describe()
    console.log('\n=== Добавляем объект без метода describe() ===');
    const nonDescribableItem = { id: 100, name: 'Unknown Item' } as Product;
    productStorage.add(nonDescribableItem);
    
    console.log('\nВызов describeAll() после добавления объекта без метода describe():');
    productStorage.describeAll();
}
