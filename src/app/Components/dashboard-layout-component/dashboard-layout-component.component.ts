import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout-component',
  template: `
  <div>
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <!-- sidebar content here -->
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Dashboard Admin</div>
          <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">
            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
            Accueil
          </a>
          <div class="sb-sidenav-menu-heading">Interface</div>
          <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
            Utilisateurs
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </a>
          <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav">
              <a class="nav-link" routerLink="/dashboard/acheteurs" routerLinkActive="active">Acheteurs</a>
              <a class="nav-link" routerLink="/dashboard/vendeurs" routerLinkActive="active">Vendeurs</a>
            </nav>
          </div>
          <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
            Terrains & Actes
            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </a>
          <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
            <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
              <a class="nav-link" routerLink="/dashboard/terrain" routerLinkActive="active">Terrain</a>
              <a class="nav-link" routerLink="/dashboard/acte" routerLinkActive="active">Acte</a>
            </nav>
          </div>
          <div class="sb-sidenav-menu-heading">Addons</div>
          <a class="nav-link" href="charts.html">
            <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
            Charts
          </a>
          <a class="nav-link" href="tables.html">
            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
            Tables
          </a>
        </div>
      </div>
      <div class="sb-sidenav-footer">
        <div class="small">By</div>
        Groupe PFE ISCAE &copy; 2024
      </div>
    </nav>
    <div id="layoutSidenav_content">
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>
`,
  styleUrls: ['./dashboard-layout-component.component.scss']
})
export class DashboardLayoutComponentComponent {

}
