import { element } from "../utils/dom";

class ModalService{
    private static instance: ModalService;
    private constructor(){}
    public static getInstance():ModalService{
        if(!ModalService.instance){
            ModalService.instance=new ModalService();
        }
        return ModalService.instance;
    }

    private createOverlay():HTMLDivElement{
    const overlay=element('div') as HTMLDivElement;
    overlay.className='modal-overlay';
    return overlay;
    }
    private createModal():HTMLDivElement{
    const modal=element('div') as HTMLDivElement;
    modal.className='modal';
    return modal;
    }
    private createHeader(iconClass:string, iconText:string, title:string):HTMLDivElement{
        const header=element('div') as HTMLDivElement;
        header.className='modal-header';

        const icon=element('div') as HTMLDivElement;
        icon.className=`modal-icon ${iconClass}`;
        icon.textContent=iconText;

        const titleElement=element('h3');
        titleElement.textContent=title;

        header.appendChild(icon);
        header.appendChild(titleElement);     
        
        return header;
    }

    private createBody(message:string):HTMLDivElement{
        const body=element('div') as HTMLDivElement;
        body.className='modal-body';
        body.textContent=message;
        return body;
    }

    private createFooter(buttons:HTMLButtonElement[]):HTMLDivElement{
        const footer=element('div') as HTMLDivElement;
        footer.className='modal-footer';

        buttons.forEach(button=>footer.appendChild(button));
        return footer;
    }

    private createButton(text:string, className:string, onClick:()=>void):HTMLButtonElement{
        const button=element('button') as HTMLButtonElement;
        button.className=className;
        button.textContent=text;
        button.onclick=onClick;
        return button;
    }

    private showModal(
        iconClass:string,
        iconText:string,
        title:string,
        message:string,
        buttons:HTMLButtonElement[],
        onOverlayClick?: () =>void
    ):void{
        const overlay=this.createOverlay();
        const modal=this.createModal();

        const header=this.createHeader(iconClass,iconText,title);
        const body=this.createBody(message);
        const footer=this.createFooter(buttons);

        modal.appendChild(header);
        modal.appendChild(body);
        modal.appendChild(footer);
        overlay.appendChild(modal);

        document.body.appendChild(overlay);

        overlay.onclick=(e)=>{
            if(e.target===overlay){
                overlay.remove();
                if(onOverlayClick){
                    onOverlayClick();
                }
            }
        };
    }

    public showSuccess(message:string, onClose?:()=>void):void{
        const okButton=this.createButton('OK','modal-btn',()=>{
            const overlay=document.querySelector('.modal-overlay');
            if(overlay){
                overlay.remove();
            }
            if(onClose){
                onClose();
            }
        });
        this.showModal(
            'success-icon',
            '✅',
            'Success!',
            message,
            [okButton],
            onClose
        );
    }
    public showError(message:string, onClose?:()=>void):void{
        const okButton=this.createButton('OK','modal-btn',()=>{
            const overlay=document.querySelector('.modal-overlay');
            if(overlay){
                overlay.remove();
            }
            if(onClose){
                onClose();
            }
        });
        this.showModal(
            'error-icon',
            '❌',
            'Error!',
            message,
            [okButton],
            onClose
        );        
    }
    public showConfirm(message:string, onYes:()=>void, onNo?:()=>void):void{
        const noButton=this.createButton('No','modal-btn modal-btn-no',()=>{
            const overlay=document.querySelector('.modal-overlay');
            if(overlay){
                overlay.remove();
            }
            if(onNo){
                onNo();
            }
        });

        const yesButton=this.createButton('Yes','modal-btn modal-btn-yes',()=>{
            const overlay=document.querySelector('.modal-overlay');
            if(overlay){
                overlay.remove();
            }
            onYes();
        });

        this.showModal(
            'confirm-icon',
            '?',
            'Confirm',
            message,
            [noButton,yesButton],
            onNo
        );
    }
}
export {ModalService};
export function showSuccessModal(message:string, onClose?:()=>void):void{
    ModalService.getInstance().showSuccess(message,onClose);
}
export function showErrorModal(message:string, onClose?:()=>void):void{
    ModalService.getInstance().showError(message,onClose);
}
export function showConfirmModal(message:string,onYes:()=>void, onNo?:()=>void):void{
    ModalService.getInstance().showConfirm(message,onYes,onNo);
}