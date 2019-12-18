import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

interface FeedbackDialogData {
  dialogTitle: string;
  dialogContent: string;
  dialogCloseBtnText: string;
}

@Component({
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {

  dialogTitle: string;
  dialogContent: string;
  dialogCloseBtnText = 'Close';

  constructor(
    private dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private feedbackDialogData: FeedbackDialogData) {
    if (feedbackDialogData) {
      if (feedbackDialogData.dialogTitle) {
        this.dialogTitle = feedbackDialogData.dialogTitle;
      }

      if (feedbackDialogData.dialogContent) {
        this.dialogContent = feedbackDialogData.dialogContent;
      }

      if (feedbackDialogData.dialogCloseBtnText) {
        this.dialogCloseBtnText = feedbackDialogData.dialogCloseBtnText;
      }
    }
  }

  ngOnInit() {
  }

  closeDialog() {
    console.log('[Dialog was closed]');
  }

}
