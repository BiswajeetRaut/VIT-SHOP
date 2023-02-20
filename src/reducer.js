var arr=[];
var name="user";
try
{
    // window.localStorage.getItem('count');
    var x=JSON.parse(window.localStorage.getItem('count'));
    var z= JSON.parse(window.localStorage.getItem('name'));
    console.log(name);
    if(z!=null)
    {
        name=z;
    }
    console.log(x);
    if(x.length)
    {
        arr=x;
    }
}catch(e){
    console.log(e);
}
export const initialState ={
    basket:arr,
    user : name,
};
export const getBAsketTotal =(basket)=>{
    return basket?.reduce((amount,item)=>item.price+amount,0);
    
}
const reducer = (state, action) => {

    // console.log(state.basket);
    switch (action.type) {
        case 'ADD_TO_BASKET':
            var a= [...state.basket,action.item];
            // a.push(action.item);
            console.log(a);
            window.localStorage.setItem('count',JSON.stringify(a));
            console.log(window.localStorage.getItem('count'));
            return {
                ...state,
                basket: [...state.basket, action.item],
            }
        case 'PAGE_RELOAD':
            return{
                ...state,
                basket: action.item,
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex((baksetItem)=>baksetItem.id===action.item.id);
            let newBasket = [...state.basket];
            if(index>=0)
            {
                newBasket.splice(index,1);
            }
            window.localStorage.setItem('count',JSON.stringify(newBasket));
            return{
                ...state,
                basket: newBasket,
            }
        case 'SIGN_IN':
            // console.log(typeof(action.details));
            window.localStorage.setItem('name',JSON.stringify(action.details));
            if(state.user=="user"||action.details.userinfo.email!=state.user.userinfo.email)
            {
                // console.log("not same");
                window.localStorage.setItem('count',JSON.stringify([]));
            }
            // window.localStorage.setItem('count',JSON.stringify([]));
            var y= JSON.parse(window.localStorage.getItem('count'));
            return {
                ...state,
                basket: y,
                user: action.details,
            }
        case 'SIGN_OUT':
            window.localStorage.setItem('count',JSON.stringify([]));
            window.localStorage.setItem('name',JSON.stringify(action.user));
                return{
                    ...state,
                    user: action.user,
                    basket: action.basket,
                }
        default: return state;
    }

}
export default reducer;
