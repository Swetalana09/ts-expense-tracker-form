import ValidationService from "./validation.service";
import StorageService from "./storage.service";
import StateService from "./state.service";
import LogicService from "./logic.service";

export const validation=ValidationService.getInstance();
export const storage=StorageService.getInstance();
export const state=StateService.getInstance();
export const logic=LogicService.getInstance();

export default{
    validation,
    storage,
    state,
    logic
};