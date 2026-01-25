import { element } from "../utils/dom";

export function showSuccessModal(message:string, onClose?:()=>void){
    const overlay=element('div') as HTMLDivElement;
    overlay.className='modal-overlay';

    const modal=element('div') as HTMLDivElement;
    modal.className='modal';

    const header=element('div') as HTMLDivElement;
    header.className='modal-header';

    const icon=element('div') as HTMLDivElement;
    icon.className='modal-icon success-icon';
    icon.textContent='✅'

    const title=element('h3');
    title.textContent='Success!';

    header.appendChild(icon);
    header.appendChild(title);

    const body=element('div') as HTMLDivElement;
    body.className='modal-body';
    body.textContent=message;

    const footer=element('div') as HTMLDivElement;
    footer.className='modal-footer';

    const okButton=element('button') as HTMLButtonElement;
    okButton.className='modal-btn';
    okButton.textContent='OK';
    okButton.onclick=()=>{
        overlay.remove();
        if(onClose){
            onClose();
        }
    };

    footer.appendChild(okButton);

    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(footer);
    overlay.appendChild(modal);

    document.body.appendChild(overlay);

    overlay.onclick=(e)=>{
        if(e.target===overlay){
            overlay.remove();
            if(onClose){
                onClose();
            }
        }
    };
}

export function showErrorModal(message:string, onClose?:()=>void){
    const overlay=element('div') as HTMLDivElement;
    overlay.className='modal-overlay';

    const modal=element('div') as HTMLDivElement;
    modal.className='modal';

    const header=element('div') as HTMLDivElement;
    header.className='modal-header';

    const icon=element('div') as HTMLDivElement;
    icon.className='modal-icon error-icon';
    icon.textContent='❌'

    const title=element('h3');
    title.textContent='Error';

    header.appendChild(icon);
    header.appendChild(title);

    const body=element('div') as HTMLDivElement;
    body.className='modal-body';
    body.textContent=message;

    const footer=element('div') as HTMLDivElement;
    footer.className='modal-footer';

    const okButton=element('button') as HTMLButtonElement;
    okButton.className='modal-btn';
    okButton.textContent='OK';
    okButton.onclick=()=>{
        overlay.remove();
        if(onClose){
            onClose();
        }
    };

    footer.appendChild(okButton);

    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(footer);
    overlay.appendChild(modal);

    document.body.appendChild(overlay);

    overlay.onclick=(e)=>{
        if(e.target===overlay){
            overlay.remove();
            if(onClose){
                onClose();
            }
        }
    };
}


export function showConfirmModal(message:string, onYes:()=>void, onNo?:()=>void){

    const overlay=element('div') as HTMLDivElement;
    overlay.className='modal-overlay';

    const modal=element('div') as HTMLDivElement;
    modal.className='modal';

    const header=element('div') as HTMLDivElement;
    header.className='modal-header';

    const icon=element('div') as HTMLDivElement;
    icon.className='modal-icon confirm-icon';
    icon.textContent='?'

    const title=element('h3');
    title.textContent='Confirm';

    header.appendChild(icon);
    header.appendChild(title);

    const body=element('div') as HTMLDivElement;
    body.className='modal-body';
    body.textContent=message;

    const footer=element('div') as HTMLDivElement;
    footer.className='modal-footer';

    const noButton=element('button') as HTMLButtonElement;
    noButton.className='modal-btn modal-btn-no';
    noButton.textContent='No';
    noButton.onclick=()=>{
        overlay.remove();
        if(onNo){
            onNo();
        }
    };
    const yesButton=element('button') as HTMLButtonElement;
    yesButton.className='modal-btn modal-btn-yes';
    yesButton.textContent='Yes';
    yesButton.onclick=()=>{
        overlay.remove();
        onYes();
    };

    footer.appendChild(noButton)
    footer.appendChild(yesButton);

    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(footer);
    overlay.appendChild(modal);

    document.body.appendChild(overlay);

    overlay.onclick=(e)=>{
        if(e.target===overlay){
            overlay.remove();
            if(onNo){
                onNo();
            }
        }
    };
}


