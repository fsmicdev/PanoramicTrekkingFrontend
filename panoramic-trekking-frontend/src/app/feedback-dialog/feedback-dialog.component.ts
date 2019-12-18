import {Component, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface FeedbackDialogData {
  dialogTitle: string;
  dialogContent: string;
  dialogCloseBtnText: string;
  showSuccessIcon: boolean;
  showFailureIcon: boolean;
}

@Component({
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {

  dialogTitle: string;
  dialogContent: string;
  dialogCloseBtnText = 'Close';

  showSuccessIcon = false;
  showFailureIcon = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FeedbackDialogComponent>) {
    if (data) {
      if (data.dialogTitle) {
        this.dialogTitle = data.dialogTitle;
      }

      if (data.dialogContent) {
        this.dialogContent = data.dialogContent;
      }

      if (data.dialogCloseBtnText) {
        this.dialogCloseBtnText = data.dialogCloseBtnText;
      }

      if (data.showSuccessIcon) {
        this.showSuccessIcon = data.showSuccessIcon;
      }

      if (data.showFailureIcon) {
        this.showFailureIcon = data.showFailureIcon;
      }
    }
  }

  ngOnInit() {
  }

  closeDialog() {
    console.log('[Dialog was closed]');

    this.dialogRef.close();
  }

}
