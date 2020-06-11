## UofT Hacks VII 2nd Place
https://devpost.com/software/stylelist-bepj0v

## Inspiration
Fashion has always been a world that seemed far away from tech. We want to bridge this gap with "StyleList", which understands your fashion within a few swipes and makes personalized suggestions for your daily outfits. When you and I visit the Nordstorm website, we see the exact same product page. But we could have completely different styles and preferences. With Machine Intelligence, StyleList makes it convenient for people to figure out what they want to wear (you simply swipe!) and it also allows people to discover a trend that they favor! 

## What it does

With StyleList, you don’t have to scroll through hundreds of images and filters and search on so many different websites to compare the clothes. Rather, you can enjoy a personalized shopping experience with a simple movement from your fingertip (a swipe!). StyleList shows you a few clothing items at a time. Like it? Swipe left. No? Swipe right! StyleList will learn your style and show you similar clothes to the ones you favored so you won't need to waste your time filtering clothes. If you find something you love and want to own, just click “Buy” and you’ll have access to the purchase page. 

## How I built it

We use a web scrapper to get the clothing items information from Nordstrom.ca and then feed these data into our backend. Our backend is a Machine Learning model trained on the bank of keywords and it provides next items after a swipe based on the cosine similarities between the next items and the liked items. The interaction with the clothing items and the swipes is on our React frontend. 

## Accomplishments that I'm proud of

Good teamwork! Connecting the backend, frontend and database took us more time than we expected but now we have a full stack project completed. (starting from scratch 36 hours ago!)

## What's next for StyleList

In the next steps, we want to help people who wonders "what should I wear today" in the morning with a simple one click page, where they fill in the weather and plan for the day then StyleList will provide a suggested outfit from head to toe!
