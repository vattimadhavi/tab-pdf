import { CommonModule } from '@angular/common';
import { Component, ElementRef, Type, ViewChild } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { Profile } from './tabs/profile/profile';
import { SocialMedia } from './tabs/social-media/social-media';
import { Population } from './tabs/population/population';

interface Tab {
  id: number; // add id
  title: string;
  component: Type<any>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Profile, SocialMedia, Population],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  selectedTabIndex = 0;

  tabs: Tab[] = [
    { id: 1, title: 'Profile', component: Profile },
    { id: 2, title: 'Social Media', component: SocialMedia },
    { id: 3, title: 'Population Chart', component: Population },
  ];

  selectTab(index: number) {
    this.selectedTabIndex = index;
  }

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  downloadPDF() {
    const pdfContainer = document.createElement('div');
    pdfContainer.style.padding = '10px';
    pdfContainer.style.fontFamily = 'Arial, sans-serif';

    this.tabs.forEach((tab, index) => {
      const tabHeader = document.createElement('h2');
      tabHeader.innerText = tab.title;
      pdfContainer.appendChild(tabHeader);

      const tabElement = document.getElementById(`tab-${tab.id}`);
      if (tabElement) {
        const clonedContent = tabElement.cloneNode(true) as HTMLElement;

        const canvases = clonedContent.querySelectorAll('canvas');
        canvases.forEach((clonedCanvas: HTMLCanvasElement, idx) => {
          const realCanvas = tabElement.querySelectorAll('canvas')[idx] as HTMLCanvasElement;
          if (realCanvas) {
            const img = new Image();
            img.src = realCanvas.toDataURL('image/png');
            img.style.width = realCanvas.width + 'px';
            img.style.height = realCanvas.height + 'px';
            clonedCanvas.parentNode?.replaceChild(img, clonedCanvas);
          }
        });

        const pageDiv = document.createElement('div');
        pageDiv.appendChild(clonedContent);

        if (index < this.tabs.length - 1) {
          pageDiv.style.pageBreakAfter = 'always';
        }

        pdfContainer.appendChild(pageDiv);
      }
    });

    const options = {
      margin: 10,
      filename: 'AllTabsContent.pdf',
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(options).from(pdfContainer).save();
  }
}
