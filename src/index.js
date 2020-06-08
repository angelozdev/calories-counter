
/* VARIABLES */

const $btn = document.querySelector('#btn');
const $description = document.querySelector('#description');
const $carbs = document.querySelector('#carbs');
const $calories = document.querySelector('#calories');
const $proteins = document.querySelector('#proteins');


const list = []

const attrsToString = (attrs) => {
   const keys = Object.keys(attrs);
   const attributes = [];

   keys.forEach(attr => {
      attributes.push(`${attr}="${attrs[attr]}"`)
   });

   const string = attributes.join(' ')
   return string;
} 

const tagAttrs = (obj = {}) => (content = '') => (
   `<${obj.tag}${obj.attrs ? ' ' : ''}${obj.attrs ? attrsToString(obj.attrs) : ''}>${content}</${obj.tag}>`
)


const tag = (t) => {
   if(typeof t === 'string'){
      return tagAttrs({tag: t})
   }else{
      return tagAttrs(t)
   }
}

const tableRowTag = tag('tr');
const tableRow = (items) => tableRowTag(tableCells(items))

const tableCell = tag({tag: 'td', attrs: {class: 'border px-4 py-2'}});
const tableCells = (items = []) => items.map(tableCell).join('\n')


/* FUNCTIONS */
const validateInput = (element) => {
   element.value 
   ? element.classList.remove('border-red-500')
   : element.classList.add('border-red-500')  
}

const validateInputs = () => {
   $description.value 
   ? $description.classList.remove('border-red-500')
   : $description.classList.add('border-red-500')

   $carbs.value 
   ? $carbs.classList.remove('border-red-500')
   : $carbs.classList.add('border-red-500')

   $calories.value 
   ? $calories.classList.remove('border-red-500')
   : $calories.classList.add('border-red-500')

   $proteins.value 
   ? $proteins.classList.remove('border-red-500')
   : $proteins.classList.add('border-red-500')

   if($description.value && $carbs.value && $calories.value && $proteins.value){
      addObject()
   }
}

const addObject = () => {
   const $items = document.querySelector('#items')
   const newItem = {
      description: $description.value,
      calories: Number($calories.value),
      carbs: Number($carbs.value),
      proteins: Number($proteins.value)
   }

   list.push(newItem)
   $items.innerHTML += tableRow(Object.values(newItem))
   cleanInputs()
   console.log(tableRow(Object.values(newItem)));
}

const cleanInputs = () => {
   $description.value = '';
   $carbs.value = '';
   $proteins.value = '';
   $calories.value = '';
}

/* EVENTS */

$btn.addEventListener('click' , validateInputs)
$description.addEventListener('change', () => validateInput($description))
$carbs.addEventListener('change', () => validateInput($carbs))
$calories.addEventListener('change', () => validateInput($calories))
$proteins.addEventListener('change', () => validateInput($proteins))

