import {Directive, HostListener} from "@angular/core";

@Directive({
    selector: "[kiiClickStopPropagation]"
})
export class KiiClickStopPropagationDirective
{
    @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
        event.stopPropagation();
        event.preventDefault();
    }
}