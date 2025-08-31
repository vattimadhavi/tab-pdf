import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import html2pdf from 'html2pdf.js';

interface Tab {
  title: string;
  content: string;
  image: string;
  link: string;
}
@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  selectedTabIndex = 0;
  
  tabs: Tab[] = [
    {
      title: 'Angular',
      content: 'A TypeScript-based open-source front-end framework developed by Google for building dynamic, single-page web applications (SPAs). It follows the MVC (Model-View-Controller) pattern and comes with built-in features like routing, forms, HTTP services, and dependency injection.',
      image: '/images/angular.png',
      link: 'https://angular.io'
    },
    {
      title: 'React',
      content: 'A JavaScript library developed by Facebook for building user interfaces, especially single-page applications. It is component-based and uses a virtual DOM for efficient rendering. React focuses only on the view layer and relies on additional libraries for routing or state management.',
      image: '/images/react.png',
      link: 'https://react.dev'
    },
    {
      title: 'Vue',
      content: 'A progressive JavaScript framework for building user interfaces and SPAs, created by Evan You. Vue is lightweight, flexible, and easy to integrate, and it combines the best ideas of Angular and React, offering reactive data binding and a component-based architecture.',
      image: '/images/vue.png',
      link: 'https://vuejs.org'
    }
  ];

  selectTab(index: number) {
    this.selectedTabIndex = index;
  }

@ViewChild('pdfContent') pdfContent!: ElementRef;

downloadPDF() {
  const pdfContainer = document.createElement('div');
  pdfContainer.style.padding = '10px';
  pdfContainer.style.fontFamily = 'Arial, sans-serif';

  this.tabs.forEach(tab => {
    // Tab title
    const tabHeader = document.createElement('h2');
    tabHeader.innerText = tab.title;
    tabHeader.style.backgroundColor = '#f0f0f0';
    tabHeader.style.padding = '5px';
    tabHeader.style.marginTop = '10px';
    pdfContainer.appendChild(tabHeader);

    // Tab content
    const tabContent = document.createElement('p');
    tabContent.innerText = tab.content;
    pdfContainer.appendChild(tabContent);
    const img = document.createElement('img');
    img.src = tab.image;
    img.style.width = '80px';
    img.style.height = '80px';
    img.style.display = 'block';
    img.style.marginBottom = '10px';
    pdfContainer.appendChild(img);

    // Anchor tag 
    const link = document.createElement('a');
    link.href = tab.link;
    link.innerText = tab.link;
    link.target = '_blank';
    link.style.display = 'block'; 
    link.style.textAlign = 'start'; 
    link.style.marginBottom = '15px';
    pdfContainer.appendChild(link);
  });

  const options = {
    margin: 10,
    filename: 'AllTabsContent.pdf',
    image: { type: 'png', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(pdfContainer).save();
}


}