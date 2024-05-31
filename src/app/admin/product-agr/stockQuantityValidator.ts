import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Product } from '../product/product';

export function stockQuantityValidator(products: Product[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const selectedProductIds = control.get('products')?.value;
        const inputQty = parseInt(control.get('qty')?.value, 10);

        if (!selectedProductIds || isNaN(inputQty)) {
            return null; // Skip validation if data isn't ready or input is not a number
        }

        const selectedProducts = products.filter(product => selectedProductIds.includes(product.id));
        const isOverstock = selectedProducts.some(product => {
            const maxQty =(product.qty, product.qty) || 0; // Assume 0 if 'qty' is undefined or not a number
            return inputQty > maxQty;
        });

        return isOverstock ? { overstock: true } : null;
    };
}
