
import cxj_css from'./todoList.css';
let big=require('../image/big.jpg');
let small=require('../image/small.png')
console.log(cxj_css)
Vue.component('todoList',{
    template:`<div :class="cxj_css.wrap">123456789
<img :src="big" alt="">
<img :src="small" alt=""></div>`,
    data(){
        return{
            cxj_css:cxj_css,
            big:big,
            small:small
        }
    }
})