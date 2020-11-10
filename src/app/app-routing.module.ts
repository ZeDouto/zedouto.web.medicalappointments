import { Routes, RouterModule } from '@angular/router';
import { CadastroConsultaComponent } from './cadastro-consulta/cadastro-consulta.component';
import { DetalhesConsultasComponent } from './detalhes-consultas/detalhes-consultas.component';

import { HomeComponent } from './home';
import { ListaConsultaComponent } from './lista-consulta/lista-consulta.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard } from './_helpers';
//import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'listarConsulta', component: ListaConsultaComponent, canActivate: [AuthGuard] },
    { path: 'detalhesConsulta', component: DetalhesConsultasComponent, canActivate: [AuthGuard] },
    { path: 'cadastroConsulta', component: CadastroConsultaComponent, canActivate: [AuthGuard]},
    { path: 'update', component: UploadComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);