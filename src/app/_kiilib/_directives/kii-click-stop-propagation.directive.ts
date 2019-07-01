import {Directive, HostListener} from "@angular/core";

@Directive({
    selector: "[kiiClickStopPropagation]"
})
export class KiiClickStopPropagationDirective
{
    @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
      console.log("STOPED EVENT !");
        event.stopPropagation();
        event.preventDefault();
    }
}