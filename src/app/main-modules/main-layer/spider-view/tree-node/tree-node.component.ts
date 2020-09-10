import { AlarmsPopupComponent } from './alarms-popup/alarms-popup.component';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import * as D3 from 'd3/index';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit {

  private _issue;
  @Input('issue') set issue(value) {
    this._issue = value;
    this.draw(value);
  }
  get issue() {
    return this._issue;
  }
  public isOpen = true;
  private host;
  private margin = { top: 20, right: 90, bottom: 30, left: 90 };
  private width = 500 - this.margin.left - this.margin.right;
  private height = 600 - this.margin.top - this.margin.bottom;
  private treemap = D3.tree().size([this.height, this.width]);
  private htmlElement: HTMLElement;

  constructor(private element: ElementRef, public dialog: MatDialog, router: Router, public dialogRef: MatDialogRef<TreeNodeComponent>) {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.element.nativeElement);
    router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => this.dialog.closeAll())
    ).subscribe();
  }

  ngOnInit() { }

  draw(issue) {
    if (!issue) {
      return;
    }

    var nodes = D3.hierarchy(issue, function (d) {
      return d.children;
    });

    nodes = this.treemap(nodes);
    while (this.htmlElement.hasChildNodes()) {
      this.htmlElement.removeChild(this.htmlElement.lastChild);
    }
    var svg = this.host.append('svg')
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom);
    var g = svg.append("g")

    // adds the links between the nodes
    var link = g.selectAll(".link")
      .data(nodes.descendants().slice(1))
      .enter().append("path")
      .attr("class", "link")
      .attr("d", function (d) {
        return "M" + d.y + "," + d.x
          + "C" + (d.y + d.parent.y) / 2 + "," + d.x
          + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
          + " " + d.parent.y + "," + d.parent.x;
      });

    // adds each node as a group
    var node = g.selectAll(".node")
      .data(nodes.descendants())
      .enter().append("g")
      .attr("class", function (d) {
        return "node" +
          (d.children ? " node--internal" : " node--leaf");
      })
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      })
      .on('click', (function (d) {
        console.log(d, "click event d value");

        if (d.data.children) {
          d.data._children = d.data.children;
          d.data.children = null;
        } else {
          d.data.children = d.data._children;
          d.data._children = null;
        }

        this.clickEventRoute(d);
        // this.draw(d.data);
      }).bind(this));

    // adds the circle to the node
    node.append("circle")
      .attr('class', 'circlePoints')
      .attr('r', 20)
      .attr('stroke-width', 1)
      .attr('stroke', function (d) {
        if (d.parent == null) return '#00000000';
        return '#FFFFFF';
      })
      .attr('fill', function (d) {
        if (d.parent == null) return '#00000000';
        if (d.data.disabled) return '#b3b3b3';
        return d.data.color;
      })
      .attr('cx', function (d) {
        return 25;
      })
      .attr('cy', function (d) {
        var degree = d.endAngle * (180 / Math.PI);
        return (degree <= 90) ? -10 : (degree >= 180) ? 10 : 0;
      });

    // add icon in circle
    node.append("text")
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('fill', '#ffffff')
      .style('color', '#ffffff')
      .style('font-size', '24px')
      .style('font-family', function (d) {
        return d.data.font;
      })
      .attr('x', function (d) {
        return 25;
      })
      .attr('y', function (d) {
        var degree = d.endAngle * (180 / Math.PI);
        return (degree <= 90) ? -7.5 : (degree < 180) ? 2.5 : (degree >= 180) ? 12 : 0;
      })
      .attr('class', 'iconText')
      .text(function (d) {
        return d.data.fontvalue;
      });

    // UPDATE
    // Transition to the proper position for the node
    node.transition()
      .duration(750)
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });
    // Update the node attributes and style
    node.select('circle.node')
      .attr('r', 10)
      .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
      })
      .attr('cursor', 'pointer');

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
      .duration(750)
      .attr("transform", function (d) { return "translate(" + issue.y + "," + issue.x + ")"; })
      .remove();

    nodeExit.select("circle")
      .attr("r", 1e-6);

    nodeExit.select("text")
      .style("fill-opacity", 1e-6);

    // adds the text to the node outside
    node.append("text")
      .attr("dy", ".35em")
      .style('fill', function (d) {
        if (d.data.disabled) return '#b3b3b3';
        return '#FFFFFF';
      })
      .attr("x", function (d) { return d.children ? -13 : 50; })
      .style("text-anchor", function (d) {
        return d.children ? "end" : "start";
      })
      .text(function (d) { return d.data.name; });

    //line end circle
    node.append('circle')
      .attr('r', 3)
      .attr('stroke-width', 1)
      .attr('stroke', '#fff')
      .attr('fill', '#fff')
      .style('cursor', 'pointer');

    // ### Functions ---------------------------------------------------------------------------
    function zoomed() {
      g.attr("transform", D3.event.transform);
    }
  }

  clickEventRoute(d) {
    if (d.data.eventname == "sites-tree-onairalarms") {
      this.dialogRef.close();
      var AlarmsListDialogRef = {
        width: '800px',
        height: '500px',
        panelClass: "alarms-layers-dialog-container",
      }
      const dialogRef = this.dialog.open(AlarmsPopupComponent, AlarmsListDialogRef);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    } else {

    }
  }


}
