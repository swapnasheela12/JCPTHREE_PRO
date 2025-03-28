import { Directive, ElementRef, Input, AfterViewInit, HostListener} from '@angular/core';

declare var $: any;

// Core
import Mmenu from "mmenu-js/dist/core/oncanvas/mmenu.oncanvas";
import * as DOM from 'mmenu-js/dist/_modules/dom';

// Core Add-Ons
import offcanvas from "mmenu-js/dist/core/offcanvas/mmenu.offcanvas";
import screenReader from "mmenu-js/dist/core/screenreader/mmenu.screenreader";
import scrollBugFix from "mmenu-js/dist/core/scrollbugfix/mmenu.scrollbugfix";

// Wrappers
import angular from "mmenu-js/dist/wrappers/angular/mmenu.angular";
import bootstrap from "mmenu-js/dist/wrappers/bootstrap/mmenu.bootstrap";
import magento from "mmenu-js/dist/wrappers/magento/mmenu.magento";
import olark from "mmenu-js/dist/wrappers/olark/mmenu.olark";
import turbolinks from "mmenu-js/dist/wrappers/turbolinks/mmenu.turbolinks";
import wordpress from "mmenu-js/dist/wrappers/wordpress/mmenu.wordpress";

// Add-Ons
import autoheight from "mmenu-js/dist/addons/autoheight/mmenu.autoheight";
import backbutton from "mmenu-js/dist/addons/backbutton/mmenu.backbutton";
import columns from "mmenu-js/dist/addons/columns/mmenu.columns";
import counters from "mmenu-js/dist/addons/counters/mmenu.counters";
import dividers from "mmenu-js/dist/addons/dividers/mmenu.dividers";
import drag from "mmenu-js/dist/addons/drag/mmenu.drag";
import dropdown from "mmenu-js/dist/addons/dropdown/mmenu.dropdown";
import fixedelements from "mmenu-js/dist/addons/fixedelements/mmenu.fixedelements";
import iconbar from "mmenu-js/dist/addons/iconbar/mmenu.iconbar";
import iconpanels from "mmenu-js/dist/addons/iconpanels/mmenu.iconpanels";
import keyboardnavigation from "mmenu-js/dist/addons/keyboardnavigation/mmenu.keyboardnavigation";
import lazysubmenus from "mmenu-js/dist/addons/lazysubmenus/mmenu.lazysubmenus";
import navbars from "mmenu-js/dist/addons/navbars/mmenu.navbars";
import pagescroll from "mmenu-js/dist/addons/pagescroll/mmenu.pagescroll";
import searchfield from "mmenu-js/dist/addons/searchfield/mmenu.searchfield";
import sectionindexer from "mmenu-js/dist/addons/sectionindexer/mmenu.sectionindexer";
import setselected from "mmenu-js/dist/addons/setselected/mmenu.setselected";
import sidebar from "mmenu-js/dist/addons/sidebar/mmenu.sidebar";
import toggles from "mmenu-js/dist/addons/toggles/mmenu.toggles";

@Directive({
  selector: '[mmenu]',
  exportAs: 'mmenuDirectiveExport'
})
export class MmenuDirective implements AfterViewInit {
  @Input() Mmenu: any;
  public element: String;
  public menu: any;

  constructor(private el: ElementRef) { 
  }  
  ngAfterViewInit() {
    this.element = this.el.nativeElement;

    Mmenu.core = [
      offcanvas,
      screenReader,
      scrollBugFix,
    ];
    Mmenu.addons = {
      autoheight,
      backbutton,
      columns,
      counters,
      dividers,
      drag,
      dropdown,
      fixedelements,
      iconbar,
      iconpanels,
      keyboardnavigation,
      lazysubmenus,
      navbars,
      pagescroll,
      searchfield,
      sectionindexer,
      setselected,
      sidebar,
      toggles
    };
    Mmenu.wrappers = [
      angular,
      bootstrap,
      magento,
      olark,
      turbolinks,
      wordpress
    ];

    this.Mmenu = Mmenu;
    this.menu = this.ContentInitializeCodeForMenu(this.element);
  }

  ContentInitializeCodeForMenu(elementNav) {
      const menu = new Mmenu(elementNav, 
        {
            navbar: {
              title: "Main Menu",
              titleLink: "none"
            },
            pageScroll 	: {
              scroll 		: true,
              update		: true
            },
            offCanvas: true,
            extensions: ["theme-white", "position-bottom", "border-none"],
            wrappers: ["bootstrap"],
            iconPanels: {
              add: true,
              visible: "first",
              blockPanel:false
            },
            dividers: {
              fixed: false
            },
            navbars: [
              {
                  content: ['prev', 'title'],
              }
            ],
            setSelected: {
              parent: true,
              hover: true,
              current: true
            }
        },
        {
          offCanvas: {
            clone: true
          }
        }
      );

      return menu;
  }
}