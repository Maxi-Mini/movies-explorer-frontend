import './InfoTooltip.css';

function InfoTooltip(props) {
  return (
    <section className={props.isOpen ? 'popup popup_opened' : 'popup'}>
      <div className='popup__container popup__container_type_input popup__container_type_signature'>
        <button
          onClick={props.onClose}
          className='button popup__exit-button'
          type='button'
          aria-label='Закрыть'
        ></button>
        <h2 className='popup__signature'>{props.isOpen}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
