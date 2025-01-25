

export const enableValidation = (validationConfig) => {
    const inputList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    inputList.forEach((formElement) =>{
        const inputSelector = Array.from(
            formElement.querySelectorAll(validationConfig.inputSelector)
        );
        const buttonSelector = formElement.querySelector(validationConfig.submitButtonSelector);
        toggleButtonState(inputSelector, buttonSelector, validationConfig);
        inputSelector.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                checkInputValidity(formElement, inputElement, validationConfig);
                toggleButtonState(inputSelector, buttonSelector, validationConfig);
            });
        });
    });
};

function toggleButtonState(inputList, buttonElement, validationConfig){
    if (hasInvalidInput(inputList)){
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    }
    else{
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}; 

const showInputError = (formElement, inputElement, errorMessage, validationConfig) =>{
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) =>{
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    }
    else{
        hideInputError(formElement, inputElement, validationConfig);
    }
};

const hasInvalidInput = (inputList) =>{
    return inputList.some((inputElement)=>{
        return !inputElement.validity.valid;
    });
};

export function clearValidation(form, validationConfig) {
    const formInputs = Array.from(
        form.querySelectorAll(validationConfig.inputSelector)
    );
    const formBtn = form.querySelector(validationConfig.submitButtonSelector);

    formInputs.forEach((input) => hideInputError(form, input, validationConfig));
    toggleButtonState(formInputs, formBtn, validationConfig)
}
