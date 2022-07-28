// 手写 react-router
// https://juejin.cn/post/7044530785746944014

/**
 * BrowserRouter
 */

import { useEffect, useState, createContext } from "react";
/**
 * 监听页面变化 popState , 页面跳转 pushState, 页面刷新 改变 path,也就是同步ui
 * 
 */
export const RouterContext = createContext();
export const HistoryContext = createContext();

export default function BrowserRouter(props) {
    // 页面刷新
    const [path, setPath] = useState(() => {
        const pathname = window.location.pathname;
        return pathname || '/';
    })

    const handlePopState = useCallback(() => {
        const pathname = window.location.pathname;
        setPath(pathname);
    },[])

    // 页面变化
    useEffect(() => {
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        }
    }, [])

    // 页面跳转
    const push = useCallback(() => {
        // 路由操作
        window.history.pushState({path}, null, path);
        // 同步 ui
        setPath(path);
    }, [])

    return (
        <RouterContext.Provider value={path}>
            <HistoryContext.Provider value={{push,}}>
                {props.children}
            </HistoryContext.Provider>
        </RouterContext.Provider>
    )

}


/**
 * Router
 */
 import { useEffect, useState, useContext } from "react";
 import { RouterContext } from "./BrowserRouter";

 export default function Router(props) {
    const { path:routePath, component: RouteComponent } = props;
    const path = useContext(RouterContext);

    return path === routePath ? <RouteComponent/> : null;

 }

 // 使用
//  <BrowserRouter>
//     <Router path='/' component={User}/>
//     <Router path='/name' component={Name}/>
//  </BrowserRouter>
// 组件内路由跳转使用 push()