import './styles.css';
import logo from './assets/react.svg';
import { useState } from 'react';

export default function App() {
    return (
        <Wrapper>
            <Counter initialValue={0} />
            <Counter initialValue={5} />
        </Wrapper>
    );
}

function Wrapper({ children }) {
    return <div className='wrapper'>
        <h1>Counter using React + Webpack</h1>
        <img src={logo} alt="logo" className='logo' />
        {children}
    </div>
}

function Counter({ initialValue = 0 }) {
    const [count, setCount] = useState(initialValue);


    return <div className='counter'>
        <button onClick={() => setCount(prev => prev - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(prev => prev + 1)}>+</button>
    </div>
}