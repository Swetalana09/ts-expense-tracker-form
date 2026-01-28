import {useEffect} from "react";

interface ModelProps{
    show:boolean;
    type:'success'|'error'|'confirm';
    title:string;
    message:string;
    onClose:()=>void;
    onConfirm?:()=>void;
}

function Modal({
    show,
    type,
    title,
    message,
    onClose,
    onConfirm
}:ModelProps) {
    useEffect(()=>{
        if(show){
            document.body.style.overflow='hidden';
        }else{
            document.body.style.overflow='unset';
        }
        return()=>{
            document.body.style.overflow='unset';
        };
    },[show]);

    if(!show) return null;

    const getIconClass=()=>{
        switch(type){
            case 'success':
                return 'success-icon';
            case 'error':
                return 'error-icon';
            case 'confirm':
                return 'confirm-icon';
            default:
                return '';    
        }
    };

    const getIcon=()=>{
        switch(type){
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'confirm':
                return '?';
            default:
                return '';           
        }
    };

    const handleOverlayClick=(e:React.MouseEvent)=>{
        if(e.target===e.currentTarget){
            onClose();
        }
    };

    const handleConfirm=()=>{
        if(onConfirm){
            onConfirm();
        }
        onClose();
    };

    return(
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal">
                <div className="modal-header">
                    <div className={`modal-icon ${getIconClass()}`}>{getIcon()}</div>
                    <h3>{title}</h3>
                </div>
                <div className="modal-body">{message}</div>
                <div className="modal-footer">
                    {type==='confirm' ? (
                        <>
                        <button className="modal-btn modal-btn-no" onClick={onClose}>
                            No
                            </button>
                            <button className="modal-btn modal-btn-yes" onClick={handleConfirm}>
                                Yes
                                </button>
                                </>
                    ):(
                        <button className="modal-btn" onClick={onClose}>
                            OK
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Modal;