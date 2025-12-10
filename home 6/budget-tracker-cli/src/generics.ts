// Часть 1. Интерфейсы
export interface Identifiable {
    id: number;
}

export interface Describable {
    describe(): string;
}

// Часть 2. Универсальный класс GenericStorage<T>
export class GenericStorage<T extends Identifiable> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    removeById(id: number): boolean {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        return this.items.length < initialLength;
    }

    getById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }

    getAll(): T[] {
        return [...this.items];
    }

    // Часть 3. Дополнительный функционал
    describeAll(): void {
        this.items.forEach(item => {
            const describableItem = item as any;
            if (describableItem.describe && typeof describableItem.describe === 'function') {
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
    console.log("=== Тестирование GenericStorage ===");
    
    // Создаем экземпляр GenericStorage для Product
    const storage = new GenericStorage<Product>();
    
    // Добавляем несколько продуктов
    storage.add(new Product(1, "Ноутбук", 1200));
    storage.add(new Product(2, "Смартфон", 800));
    storage.add(new Product(3, "Планшет", 500));
    
    console.log("\nВсе продукты:");
    storage.describeAll();
    
    console.log("\n=== Тестирование getById ===");
    const product = storage.getById(2);
    if (product) {
        console.log("Найден продукт:", product.describe());
    }
    
    console.log("\n=== Тестирование removeById ===");
    const removed = storage.removeById(2);
    console.log(`Удален продукт с id=2: ${removed}`);
    
    console.log("\nОставшиеся продукты после удаления:");
    storage.describeAll();
    
    // Добавляем объект, который НЕ реализует describe()
    const nonDescribableItem = { id: 4, name: "Мышь", price: 25 } as Product;
    storage.add(nonDescribableItem);
    
    console.log("\n=== После добавления объекта без describe ===");
    storage.describeAll();
    
    console.log("\n=== Получение всех элементов ===");
    const allItems = storage.getAll();
    console.log("Всего элементов:", allItems.length);
}
