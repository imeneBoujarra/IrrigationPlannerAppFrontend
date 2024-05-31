import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAgrService } from "./productagr.service";
import { ProductService } from '../product/product.service';
import { ProductAgr } from './productagr';
import { Product } from '../product/product';
import { ProductAgrDialogComponent } from './productagr-dialog.component';

@Component({
  selector: 'app-product-agr', // Définit le sélecteur utilisé pour l'intégration dans le HTML.
  templateUrl: './product-agr.component.html', // Chemin vers le fichier de template du composant.
  styleUrls: ['./product-agr.component.scss'] // Chemin vers les styles spécifiques du composant.
})
export class ProductAgrComponent implements OnInit {
  displayedColumns: string[] = ['products', 'qty', 'action']; // Colonnes à afficher dans la table.
  productsagr: ProductAgr[] = []; // Liste des produits agrégés à afficher.
  products: Product[] = []; // Liste de produits à utiliser pour le choix dans les dropdowns.

  constructor(
    public dialog: MatDialog, // Service pour gérer les dialogues modaux.
    private productagrService: ProductAgrService, // Service pour les opérations sur les produits agrégés.
    private productService: ProductService // Service pour les opérations sur les produits simples.
  ) {}

  ngOnInit(): void {
    this.fetchAll(); // Charge tous les produits agrégés au démarrage.
    this.fetchProducts(); // Charge tous les produits au démarrage.
  }

  // Récupère tous les produits agrégés depuis le service et les stocke.
  fetchAll() {
    this.productagrService.fetchAll().subscribe({
      next: (r) => {
        this.productsagr = r.map((e: any) => {
          const data = e.payload.doc.data(); // Extrait les données de chaque document.
          data.id = e.payload.doc.id; // Ajoute l'ID du document aux données.
          return data;
        });
      },
      error: (err) => {
        console.log('Error while fetching treatments');
      }
    });
  }

  // Récupère tous les produits depuis le service et les stocke.
  fetchProducts() {
    this.productService.fetchAll().subscribe({
      next: (r) => {
        this.products = r.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      error: (err) => {
        console.log('Error while fetching products');
      }
    });
  }

  // Renvoie le nom d'un produit par son ID, ou null si non trouvé.
  getProductName(id: string): string | null {
    const product = this.products.find(s => s.id === id);
    return product && product.name ? product.name : null;
  }

  // Supprime un produit agrégé par son ID et recharge la liste.
  delete(id: string) {
    this.productagrService.delete(id).then(r => {
      this.fetchAll();
    });
  }

  // Ouvre un dialogue pour mettre à jour un produit agrégé.
  update(productagr: ProductAgr) {
    const dialogRef = this.dialog.open(ProductAgrDialogComponent, {
      width: '500px',
      data: { ProductAgr: productagr, products: this.products }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchAll(); // Recharge les données après la fermeture du dialogue.
      }
    });
  }

  // Ouvre un dialogue pour créer un nouveau produit agrégé.
  openDialog() {
    const dialogRef = this.dialog.open(ProductAgrDialogComponent, {
      width: '500px',
      data: { products: this.products }
    });
  }
}
