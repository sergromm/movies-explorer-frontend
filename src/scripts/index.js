const fs = require('fs');
const path = require('path');

// получаем аргументы:
// 1 name - название компонента
// 2 endpoint - папка в которой создастся компонент [опционально]
// 3 flat - указывает нужно ли класть файлы в отдельную папку [опционально]
const upperCase = word => {
  if (word !== '') {
    return word[0].toUpperCase() + word.slice(1, word.length);
  }
};

const args = process.argv.slice(2).map(arg => {
  if (arg === 'flat') {
    return arg;
  } else if (arg.includes('/')) {
    return arg.split('/').map(word => upperCase(word)).join('/');
  } else {
    return upperCase(arg);
  }
  // для тех кому лень нажимать шифт
});

const [name, endpoint, flat] = args;

if (!name) throw new Error('Укажите название компонента.');

// определяем путь к папке с компонентам
let dir;
if (!endpoint) {
  dir = `./components/${name}/`;
} else if (flat) {
  dir = `./components/${endpoint}/`;
} else {
  dir = `./components/${endpoint}/${name}/`;
}

const exists = (!flat && fs.existsSync(dir)) || fs.existsSync(`${dir}${name}.js`);
// ошибка если компонент с таким именем уже создан
if (exists) throw new Error('Компонент с таким именем уже существует.');

// создаем папку компонента
// optional: если папки компонентов ещё не существует, можно добавить опцию { recursive: true } 
// тогда папка components будет создана
if (!flat) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFileErrorHandler(err) {
  if (err) throw err;
}

// вторым аргументом можно добавить содержимое созданного файла, например заготовку компонента
// создаем js файл в новой папке
fs.writeFile(`${dir}/${name}.js`, '', writeFileErrorHandler);
// создаем css файл в новой папке
fs.writeFile(`${dir}/${name}.css`, '', writeFileErrorHandler);

// optional: проверяем что компонент создан в нужной папке
console.log(`Коомпонент ${name} создан в папке: ${path.resolve(dir)}`);
