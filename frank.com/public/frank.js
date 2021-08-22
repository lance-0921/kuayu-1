
//方法一：CORS 解决跨域问题

// const request = new XMLHttpRequest
// request.open('GET','http://qq.com:8888/friends.json')
// request.onreadystatechange = () =>{
//     if(request.readyState === 4 && request.status ===200){
//         console.log(request.response)
//     }
// }
// request.send()


// 方法二： JSONP 解决跨域

// const random = 'frankJSONCallbackName'+ Math.random()
// window[random] = (data) =>{  //获取数据方法一：执行函数  方法二：赋值
//     console.log(data)
// }  
// const script = document.createElement('script')
// script.src = `http://qq.com:8888/friends.js?functionName=${random}`  //增加查询参数
// script.onload=()=>{   
//     script.remove()
// }
// document.body.appendChild(script)

//封装JSONP

function jsonp(url){
    return new Promise((resolve,reject) =>{
        const random = 'frankJSONCallbackName'+ Math.random()
        window[random] = (data) =>{  //获取数据方法一：执行函数  方法二：赋值
        resolve(data)
        }  
        const script = document.createElement('script')
        script.src = `${url}?callback=${random}`
        script.onload=()=>{   
            script.remove()
        }
        script.onerror = ()=>{
            reject()
        }
        document.body.appendChild(script)
    })
}
//JSONP相对于Ajax天生的缺点是，只能知道事件成功或者失败，拿不到状态码

//引用jsonp

jsonp('http://qq.com:8888/friends.js')
 .then((data)=>{
     console.log(data)
 })