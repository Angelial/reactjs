import React from 'react';
import ReactDOM from 'react-dom'


//在JSX中使用表达式
function formatName(user) {
    return user.firstName + ' ' + user.lastName
}

//JSX本身也是一种表达式
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}</h1>;
    } else {
        return <h1>Hello, stranger</h1>
    }
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};
//在JSX中使用表达式
const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);
//JSX本身也是一种表达式
const element1 = (
    getGreeting()
);

//JSX属性 可以使用引号来定义以字符串为值的属性, 也可以使用大括号来定义JS表达式为值的属性
//使用大括号包裹的JS表达式时就不要再到外面套引号了，JSX会将引号当中的内容识别为字符串而不是表达式。

const element2 = <div tabIndex="0"></div>;
const element3 = <img src={user.firstName} alt={user.lastName}/>;

//JSX嵌套, 如果JSX标签是闭合式的，那么结尾处用 /> ，就好像XML/HTML 一样
//JSX标签同样可以相互嵌套
//ReactDOM 使用camelCase 小驼峰命名来定义属性，而不是HTML的属性名称
const element4 = (
    <div>
        <h1>Hello!</h1>
        <h2>GOOD TO SEE YOU HERE.</h2>
    </div>
);

//JSX 防注入攻击
//const title = response.potentiallyMaliciousInput;

//直接使用时安全的; React DOM 在渲染之前默认会过滤所有传入的值，它可以确保你的应用不会被注入攻击。
// 所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止XXS(跨站脚本)攻击
//const elment5 = <h1>{title}</h1>;

// JSX代表Object

// Babel 转译器会把JSX转换成一个名为 React.createElement() 的方法调用
const element6 = (
    <h1 className="greeting">
        Hello,    {2}world!
    </h1>
);
const element7 = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);

function tick() {
    const element8 = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}</h2>
        </div>
    );

    ReactDOM.render(
        element8,
        document.getElementById('root')
    );
}
// setInterval(tick, 1000)
//组件

// 组件可以将UI切分成一些独立的，可复用的部件，这样只需要构建每一个单独的部件

//组件从概念上看就像是函数，它可以接受任意的输入值（称之为 "props"），并返回一个需要在页面上展示的React元素

// 函数定义组件
function WelcomeFun(props) {
    return <h1>Hello, {props.name}</h1>
}
//类定义组件
class Welcome extends React.Component {
    render() {
        return <h1>Helle, {this.props.name}</h1>
    }
}

//React元素除了DOM标签，也可以是用户自定义组件。
//当React遇到的元素是用户自定义组件，它会将JSX属性作为单个对象传递给该组件，这个对象称之为“props”
const element10 = <WelcomeFun name="Sara"/>;
//警告：组件名称必须以大写字母开头， 在使用该组件时必须定义或引入它


// 组合组件
//组件的返回值只能有一个根元素，所以需要一个<div>来包裹所有<WelcomeFun />元素的原因
function AppFun() {
    return (
        <div>
            <WelcomeFun name="Sara"/>
            <WelcomeFun name="Cahal"/>
            <WelcomeFun name="Edite"/>
        </div>
    );
}

//提取组件
//props不能修改它自己的props -- props的只读性
function CommentFun(props) {
    return (
        <div className="Comment">
            <div className="UserInfo">
                <UserInfo user={props.author} />
            </div>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-data">
                {formatName(props.date)}
            </div>
        </div>
    );
}


function Avatar(props) {
    return (
        <img className="Avator"
             src={props.user.avatarUrl}
             alt={props.user.name}
        />
    );
}

function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user}/>
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}
// ReactDOM.render(
//     element10,
//     document.getElementById('root')
// );

// ReactDOM.render(
//     <AppFun />,
//     document.getElementById('root')
// );


function ClockFun(props) {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}
function tick2() {
    ReactDOM.render(
        <ClockFun date={new Date()} />,
        document.getElementById('root')
    )
}
//setInterval(tick2, 1000);

//state 状态和属性十分相似，但是状态是私有的，完全受控于当前组件

class Clock extends React.Component {
    constructor (props) {
        super(props);
        this.state = {date: new Date()};
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }
    componentWillUnmount () {
        clearInterval(this.timerID)
    }
    tick() {
        this.setState({
            date: new Date()
        })
    }
    render () {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
//正确的使用状态
// 不要直接更新状态，应当使用setState(); 构造函数是唯一能够初始化this.state的地方
//状态更新可能是异步，因为this.props和this.state 可能是异步更新的，不应该依靠它们的值来计算下一个状态
//使用第二种形式 setState() 来接受一个函数
// this.setState((prevState, props) => ({
//     counter: prevState.counter + props.increment
// }));
//状态更新合并， 调用setState()时，React将提供的对象合并到当前状态
//数据自顶向下流动
// ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
// );



//事件处理
//React 事件绑定属性的命名采用驼峰式写法，而不是小写
//如果采用JSX的语法需要传入一个函数作为事件处理函数，而不是一个字符串（DOM元素的写法）
//不是使用返回false的方式阻止默认行为，必须明确使用preventDefault

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        )
    }
}
// ReactDOM.render(
//     <Toggle />,
//     document.getElementById('root')
// );

//向事件处理程序传递参数
// 分别通过arrow functions 和 Function.prototype.bind 来为事件处理函数传递参数
//<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

class Popper extends React.Component{
    constructor() {
        super();
        this.state = {name: 'Hello World!'};
    }
    //通过bind方式向监听函数传参，在类组件中定义的监听函数，
    // 事件对象e要排在所传递参数的后面
    preventPop(name, e) { //事件对象e要放在最后
        e.preventDefault();
        alert(name)
    }
    render() {
        return (
            <div>
                <p>hello</p>
                <a href="https://reactjs.org"
                   onClick={this.preventPop.bind(this, this.state.name)}>click</a>
            </div>
        )
    }
}
// ReactDOM.render(
//     <Popper />,
//     document.getElementById('root')
// );

//条件渲染
//React中的条件渲染和JavaScript中的一致，使用JS操作符if 或条件运算符来创建表示当前状态的元素，然后让React根据它们来更新UI
function UserGreeting(props) {
    return <h1>Welcome back!</h1>
}
function GuestGreeting(props) {
    return <h1>Please sign up.</h1>
}
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}
// ReactDOM.render(
//     <Greeting isLoggedIn={true}/>,
//     document.getElementById('root')
// );

//元素变量  可以使用变量来储存元素。它可以帮助你有条件的渲染组件的一部分，而输出其他部分不会更改

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}
function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}
class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: true};
    }
    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }
    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;
         let button = null;
         if (isLoggedIn) {
             button = <LogoutButton onClick={this.handleLogoutClick} />;
         } else {
             button = <LoginButton onClick={this.handleLoginClick} />;
         }
         return (
             <div>
                 <Greeting isLoggedIn={isLoggedIn} />
                 {button}
             </div>
         );
    }
}
// ReactDOM.render(
//     <LoginControl/>,
//     document.getElementById('root')
// );

//JSX的条件渲染语法
//与运算符 &&
// 通过花括号包裹在JSX中的嵌入式任何表达式，也包括JS的逻辑与&&，可以方便地条件渲染一个元素
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello, world</h1>
            {unreadMessages.length > 0 &&
                <h2>Yuo have {unreadMessages.length} unread messages</h2>
            }
        </div>
    );
}
//之所以能这样是因为 true && expression 总是返回expression， 而 false && expression 总是返回false
//因此，如果条件是true， && 右侧的元素就会被渲染，如果是false，React会忽略并跳过它
const messages = ['React', 'Re: react', 're:re: react'];
// ReactDOM.render(
//     <Mailbox unreadMessages={messages}/>,
//     document.getElementById('root')
// );
//三目运算 条件运算符 condition ? true : false
//条件渲染一小段文本
/*render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
        <div>
            The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
        </div>
    );
}*/
//也可以用在较大的表达式中
/*render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
        <div>
            {isLoggedIn ? (
                <LogoutButton onClick={this.handleLogoutClick} />
            ) : (
                <LoginButton onClick={this.handleLoginClick} />
            )}
        </div>
    );
}*/

//阻止组件渲染

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }
    return (
        <div className="warning">
            Warning!
        </div>
    );
}
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showWaring: true };
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    handleToggleClick() {
        this.setState(prevState => ({
            showWaring: !prevState.showWaring
        }));
    }
    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWaring}/>
                <button onClick={this.handleToggleClick}>
                    {this.state.showWaring ? 'Hide' : 'show'}
                </button>
            </div>
        )
    }
}
// ReactDOM.render(
//     <Page/>,
//     document.getElementById('root')
// );

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number, index) =>
    <li key={number.toString()}>{number}</li>
);
// ReactDOM.render(
//     <ul>{listItems}</ul>,
//     document.getElementById('root')
// );

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number, index) =>
        <li key={number.toString()}>{number * 2}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);

//keys 可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此需要给数组中的每一个元素赋予一个确定的标识
//一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常使用来自数据的id作为元素的key

//用key提取组件


