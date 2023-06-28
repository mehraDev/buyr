export interface IInput {
    label?: string;
    value: any;
    onChange: (value: any) => void;
    placeholder?: string;
    required?: boolean
    labelTop?: boolean
  }
