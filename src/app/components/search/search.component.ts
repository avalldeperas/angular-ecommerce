import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.listProductsByName();
  }

  private listProductsByName() {
    console.log('listingProucts by its name');
  }

  doSearch(value: string) {
    const success = this.router.navigateByUrl(`/search/${value}`);
    if (!success) {
      console.log("error on router!");
    }
  }
}
