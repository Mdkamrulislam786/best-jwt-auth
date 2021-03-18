import React from "react";
import { Link } from "react-router-dom";


interface Props { }

export const Header: React.FC<Props> = () => {
    let body: any = null
    return (
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }} >
            <div>
                <Link to="/">home</Link>
            </div>
            <div>
                <Link to="/register">register</Link>
            </div>
            <div>
                <Link to="/login">login</Link>
            </div>
            <div>
                <Link to="/bye">bye</Link>
            </div>
            <div>
                <button
                >
                    logout
                    </button>
            </div>
           
                {body}
            
        </header>
    );
};