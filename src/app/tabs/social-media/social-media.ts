import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-social-media',
  imports: [CommonModule],
  templateUrl: './social-media.html',
  styleUrl: './social-media.css'
})
export class SocialMedia {
  selectedCard: number | null = 2; 

  socialCards = [
    {
      id: 1,
      title: 'TWITTER',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim',
      icon: '/images/twitter-logo-png.png',
      link: 'https://twitter.com'
    },
    {
      id: 2,
      title: 'INSTAGRAM',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim',
      icon: '/images/instagram-social-media-icon.png',
      link: 'https://instagram.com'
    },
    {
      id: 3,
      title: 'YOUTUBE',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim',
      icon: '/images/youtube_logo.png',
      link: 'https://youtube.com'
    }
  ];

  selectCard(cardId: number) {
    this.selectedCard = cardId;
  }
}
