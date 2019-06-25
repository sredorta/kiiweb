import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { KiiSpinnerOverlayComponent } from '../_components/kii-spinner-overlay/kii-spinner-overlay.component';

@Injectable({
  providedIn: 'root'
})
export class KiiSpinnerService {
  private overlayRef: OverlayRef = null;

  public visible = false;

  constructor(private overlay: Overlay) {}

  public show() {
    // Returns an OverlayRef (which is a PortalHost)
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
      this.visible = true;
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(KiiSpinnerOverlayComponent);
    const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
      this.visible = false;
    }
  }
}