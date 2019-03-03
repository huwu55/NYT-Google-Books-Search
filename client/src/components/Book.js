import React from "react";
import "./style.css";

export default (prop) => {
    let btnVal = "";
    if (prop.buttonVal == "Save") btnVal="far fa-save";
    else btnVal="far fa-trash-alt";
    return (
        <div className="card">
            <div className="row">
                <div className="col-md-2">
                    <img src={prop.image} alt={prop.title}></img>
                </div>
                <div className="col-md-10 px-3">
                    <div className="card-block px-3">
                        <h4 className="card-title">{prop.title}</h4>
                        <h5 className="card-title">
                            {prop.authors.map((author, i)=>(
                                <span key={i}>{author} &nbsp;&nbsp;</span>
                            ))}
                        </h5>
                        <a target="_blank" href={prop.link}><button className="btn btn-outline-info">View <i class="far fa-eye"></i></button></a>
                        <button className={prop.buttonClass} onClick={()=>prop.btnOnClick(prop.fnParam)}>
                            {prop.buttonVal} <i class={btnVal}></i>
                        </button>
                        <p className="card-text">{prop.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
