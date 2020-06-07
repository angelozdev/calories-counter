
/* VARIABLES */

const $btn = document.querySelector('#btn');
const $description = document.querySelector('#description');
const $carbs = document.querySelector('#carbs');
const $calories = document.querySelector('#calories');
const $proteins = document.querySelector('#proteins');


const list = []

const attrsToString = (obj = {}) => {
   const keys = Object.keys(obj)
   const attrs = []

   keys.forEach(attr => {
      attrs.push(`${attr}="${obj[attr]}"`)
   });

   const string = attrs.join(' ')

   return string;
}


const tagAttrs = (obj) => (content = "") => (
   `<${obj.tag}${obj.attrs ? ' ' : ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`
   )
   
console.log(tagAttrs({tag: 'h1', attrs: {class: 'hola'}})('Hola mundo'));

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
   const newItem = {
      description: $description.value,
      calories: Number($calories.value),
      carbs: Number($carbs.value),
      proteins: Number($proteins.value)
   }

   list.push(newItem)

   cleanInputs()
   console.log(tag('h1')(newItem.description));
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

