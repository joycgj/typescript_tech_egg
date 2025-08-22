// 因为用的是 const，值不能被重新赋值
// TypeScript 会把 url 的类型推断为字面量类型
const url = "https://api.thecatapi.com/v1/images/search";

// document.querySelector('button') 的返回值类型是: Element | null

// const button = document.querySelector('button') as HTMLButtonElement;
// 这样 button 的类型就是 HTMLButtonElement | null 被断言为 HTMLButtonElement
// 当然，这样如果页面上没有 <button>，就会在运行时报错

// HTMLButtonElement | null 是 typescript 的联合类型
const button: HTMLButtonElement | null = document.querySelector('button');
const tableBody: HTMLTableElement | null = document.querySelector('#table-body');

interface CatType {
    id: string;
    url: string;
    height: number;
    width: number;
    test?: boolean;
}

class Cat implements CatType {
    id: string;
    url: string;
    height: number;
    width: number;

    constructor(id: string, url: string, height: number, width: number) {
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
    }
}

class WebDisplay {
    public static addData(data: CatType): void {
        const cat: Cat = new Cat(data.id, data.url, data.height, data.width);
        const tableRow: HTMLTableRowElement = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${cat.id}</td>
            <td><img src="${cat.url}" /></td>
            <td>${cat.height.toString()}</td>
            <td>${cat.width.toString()}</td>
            <td>${cat.url}</td>
            <td><a href="#">X</a></td>
        `;
        tableBody?.appendChild(tableRow);
    }
}

async function getJSON<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const json: Promise<T> = await response.json();
    return json;
}

async function getData(): Promise<void> {
    try {
        const json: CatType[] = await getJSON<CatType[]>(url);
        const data: CatType = json[0];
        WebDisplay.addData(data);
    } catch (error: Error | unknown) {
        let message: string;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }
        console.log(message);
    }
}

// <'click'> 是在 显式指定 addEventListener 的泛型参数，让 TypeScript 知道事件类型，
// 从而在回调里提供更精确的类型提示（如 MouseEvent）。但在大多数情况下，TS 会自动推断出来，不需要手动写
// 参数中的 'Click' 大写是无效的，事件名在 DOM API 里必须小写：
button?.addEventListener<'click'>('click', getData);