import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { QueryAdministrationPopupComponent, QueryAdministrationPopupDialogModel } from './poups/query-administration-popup/query-administration-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/_services/data-sharing.service';
import { NpQaSaveQueryPopupComponent, NpQaSaveQueryPopupDialogModel } from './poups/np-qa-save-query-popup/np-qa-save-query-popup.component';

@Component({
  selector: 'app-create-query-page',
  templateUrl: './create-query-page.component.html',
  styleUrls: ['./create-query-page.component.scss']
})
export class CreateQueryPageComponent implements OnInit {
  searchGrid: string;
  messageSubscription: any;
  variableDiffX: any;
  variableDiffY: any;
  runQueryContent: string = "Unique_Customers_7K_to_10k";
  text2: string;
  text3: string;
  text4: string;
  finalValue: string = "Value in : Number";
  selectedItem: any;
  public molist: string[] = ['+', '-', '*', '=', '<', '>', '≤', '≥', '/','≠'];
  xValue: number;

  constructor(
    public dialog: MatDialog, private router: Router, private datashare: DataSharingService) {
  }

  ngOnInit(): void {
    $(".fixed").hide();
    const editable = document.getElementById("contenteditable");
    document.addEventListener("click", (e) => this.toggleTooltip(e, editable));
    // document.addEventListener("click", (e) => this.updateIndex(e, editable));
    document.addEventListener("keyup", (e) => this.toggleTooltip(e, editable));
    // document.addEventListener("keyup", (e) => this.updateIndex(e, editable));
    this.messageSubscription = this.datashare.currentMessage.subscribe((message) => {
      console.log(message)
      if (message) {
        this.variableDiffX = 280;
        this.variableDiffY = 122;
      } else {
        this.variableDiffX = 0
        this.variableDiffY = 122
      }
      // setTimeout(() => {
      //   this.makeDo(this.secondaryKpi, this.primaryKpi);
      // }, 500);
    });
  }

  getCaretCoordinates() {
    let x = 0,
      y = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      if (selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(true);
        const rect = range.getClientRects()[0];
        if (rect) {
          x = rect.left;
          y = rect.top;
        }
      }
    }
    return { x, y };
  }

  // getCaretIndex(element) {
  //   let position = 0;
  //   const isSupported = typeof window.getSelection !== "undefined";
  //   if (isSupported) {
  //     const selection = window.getSelection();
  //     if (selection.rangeCount !== 0) {
  //       const range = window.getSelection().getRangeAt(0);
  //       const preCaretRange = range.cloneRange();
  //       preCaretRange.selectNodeContents(element);
  //       preCaretRange.setEnd(range.endContainer, range.endOffset);
  //       position = preCaretRange.toString().length;
  //     }
  //   }
  //   return position;
  // }

  toggleTooltip(event, contenteditable) {
    if (this.router.url == "/JCP/Administration/Module-Management/Nominal-Planning/Query-Administration/Create-Query") {
      const tooltip = document.getElementById("create-query-custom-tooltip");
      if (event.key == "w") {
        console.log(event.key == "w")
        $("#contenteditable").addClass("important");
      } else {
        $("#contenteditable").removeClass("important");
      }
      if (contenteditable.contains(event.target)) {
        const { x, y } = this.getCaretCoordinates();
        this.xValue = x
        tooltip.setAttribute("aria-hidden", "false");
        tooltip.setAttribute(
          "style",
          `display: inline-block; left: ${x - this.variableDiffX}px; top: ${y - this.variableDiffY}px`
        );
        if (event.key == "s") {
          this.molist= ['+', '-', '*', '=', '<', '>', '≤', '≥', '/','≠'];
        } else if (event.key == "a") {
          this.molist= ['AND', 'OR', 'IF'];
        } else if (event.key == " ") {
          tooltip.setAttribute("aria-hidden", "true");
          tooltip.setAttribute("style", "display: none;");
        } else {
          this.molist= ['CONTAIN', 'EQUAL'];
        }
      } else {
        // if (this.router.url == "/JCP/Administration/Module-Management/Nominal-Planning/Query-Administration/Create-Query") {
          tooltip.setAttribute("aria-hidden", "true");
          tooltip.setAttribute("style", "display: none;");
          // tooltip2.setAttribute("aria-hidden", "true");
          // tooltip2.setAttribute("style", "display: none;");
          // tooltip3.setAttribute("aria-hidden", "true");
          // tooltip3.setAttribute("style", "display: none;");
        // }
      }
    }
  }

  textQueryFun(content) {
    this.runQueryContent = content.innerText
    if (this.xValue == 0){
      this.finalValue = ""
    } else {
      this.finalValue = "Final Value In : Number"
    }
  }

  // onClickMo(item, contentValue) {
  //   console.log(contentValue.innerText)
  //   contentValue.innerText = contentValue.innerText + item
  //   this.selectedItem = item;
  // }

  pasteHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
      // IE9 and non-IE
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();

        // Range.createContextualFragment() would be useful here but is
        // only relatively recently standardized and is not supported in
        // some browsers (IE9, for one)
        var el = document.createElement("div");
        el.innerHTML = html;
        var frag = document.createDocumentFragment(),
          node, lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        var firstNode = frag.firstChild;
        range.insertNode(frag);

        // Preserve the selection
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.setStartBefore(firstNode);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  }

  // document.getElementById("paste").onclick = function() {
  //   document.getElementById('test').focus();
  //   pasteHtmlAtCaret('<b>INSERTED</b>');
  //   return false;
  // };



  createPopup(): void {
    const dialogData = new QueryAdministrationPopupDialogModel();
    const dialogRef = this.dialog.open(QueryAdministrationPopupComponent, {
      data: dialogData,
      // width: '500px',
      height: '400px',
      panelClass: 'np-qa-popup-dialog'
    });
  }

  generateNdSaveQuery(): void {
    const dialogData = new NpQaSaveQueryPopupDialogModel();
    const dialogRef = this.dialog.open(NpQaSaveQueryPopupComponent, {
      data: dialogData,
      width: '500px',
      height: '250px',
      panelClass: 'np-save-query-popup-dialog'
    });
  }

  goBackCancel(value): void {
    if(value == "back"){
      this.router.navigate(['/JCP/Modules/Planning-Deployment/Nominal-Capacity/Create-Nominal-Task']);
    } else {
      this.router.navigate(['/JCP/Administration/Module-Management/Nominal-Planning/Query-Administration']);
    }
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
