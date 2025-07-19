import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
import { LightningElement, wire } from 'lwc';

export default class BoatSearchForm extends LightningElement {

    selectedBoatTypeId = '';

    error = undefined;

    searchOptions;

    @wire(getBoatTypes)
    boatTypes({error, data}){
        if(data){
            this.searchOptions = data.map(type => {
                return {label: type.Name, value: type.Id}
            })
            this.searchOptions.unshift({label:'All Boat Types', value: ''});
            return
        }

        this.serachOptions = undefined;
        this.error = error
        return 
    }

    handleSearchOptionChange(event){
        this.selectedBoatTypeId = event.detail.value;
        
        const searchEvent = new CustomEvent('search', {
            detail: { boatTypeId: this.selectedBoatTypeId}
        })

        this.dispatchEvent(searchEvent);
    }

}