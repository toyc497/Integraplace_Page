import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Opportunity } from '../../Interfaces/opportunity.interface';
import { OpportunityService } from '../../Services/opportunity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opportunity',
  standalone: true,
  imports: [
    MatIcon,
    CommonModule
  ],
  templateUrl: './opportunity.component.html',
  styleUrl: './opportunity.component.css'
})
export class OpportunityComponent {

  link_temp: string = 'https://pncp.gov.br/app/editais/07609621000116/2024/81';
  opportunityList: Opportunity[] = [];

  constructor(private opportunityService: OpportunityService){}

  ngOnInit(){

    this.opportunityService.findAllOpportunity().subscribe(
      response => this.opportunityList = response
    );

  }

  openInPncp(link: string){
    window.open(link, "_blank");
  }

  desistirAction(id: string){
    alert(`Desistido: ${id}`)
  }

  participateAction(id: string){
    alert(`Participar: ${id}`)
  }

}
