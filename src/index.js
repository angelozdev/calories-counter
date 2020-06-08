
/* VARIABLES */

const $btn = document.querySelector('#btn');
const $description = document.querySelector('#description');
const $carbs = document.querySelector('#carbs');
const $calories = document.querySelector('#calories');
const $protein = document.querySelector('#protein');

window.addEventListener('load', () => {
   renderItems();
   updateTotals();
})

const list = [
   {
      description: 'Apple',
      calories: 40,
      carbs: 50,
      protein: 10
   },
   {
      description: 'Chicken',
      calories: 100,
      carbs: 50,
      protein: 200
   }
]

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

   $protein.value 
   ? $protein.classList.remove('border-red-500')
   : $protein.classList.add('border-red-500')

   if($description.value && $carbs.value && $calories.value && $protein.value){
      addObject()
   }
}

const renderItems = () => {
   const $items = document.querySelector('#items')
   $items.innerHTML = '';
   
   const rows = list.map(item => {
      const { description, carbs, protein, calories } = item;
      return tableRow([description, calories, carbs, protein])
   }).join('')

   $items.innerHTML = rows;
}

const addObject = () => {
   const newItem = {
      description: $description.value,
      calories: Number($calories.value),
      carbs: Number($carbs.value),
      protein: Number($protein.value)
   }

   list.push(newItem)
   console.log(list);
   renderItems();
   updateTotals();
   cleanInputs();
}

const updateTotals = () => {
   const $totalCalories = document.querySelector('#totalCalories'),
         $totalCarbs = document.querySelector('#totalCarbs'),
         $totalProtein = document.querySelector('#totalProtein');

   let calories = 0, protein = 0, carbs = 0;
   list.map(item => {
      calories += item.calories;
      protein += item.protein;
      carbs += item.carbs;
   })
   
   $totalCalories.innerHTML = calories;
   $totalCarbs.innerHTML = carbs;
   $totalProtein.innerHTML = protein;
}

const cleanInputs = () => {
   $description.value = '';
   $carbs.value = '';
   $protein.value = '';
   $calories.value = '';
}

/* EVENTS */

$btn.addEventListener('click' , validateInputs)
$description.addEventListener('change', () => validateInput($description))
$carbs.addEventListener('change', () => validateInput($carbs))
$calories.addEventListener('change', () => validateInput($calories))
$protein.addEventListener('change', () => validateInput($protein))

