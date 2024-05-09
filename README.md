"Field of Flowers" (Prato Fiorito)

Benito Sanchez
cs470
Dr Ali Kooshesh

This project was an attempt at recreating minesweeper using what we know about 
react and javascript. In my implementation I took insperation from several
different versions of the game, whether it be for convinience or for simplicity.

Although the implementation, I feel, is incredibly robust, there are a few 
peculiar situations that tend to arrive from time to time. Those being: 
  * after restarting, there is a chance that your first click is on a mine
  * every once in a while it requires two clicks instead of one for any process
    (i.e., placing a flag, revealing a tile)

I was unable to fix these in time, as they are a bit tough to replicate.


details of the implementation:
NOTE: I had some people test my implementation and a good handful didn't know
        how to unflag a tile. I'm pretty sure being in flag mode and clicking
        on a flag is intuitive, but just in case it's not I feel that I should
        mention that this is how I chose to implement that mechanic.

Although I'm not sure the intent of the project was having us use the routers
and such for pasing around the size of the grid. I felt it was a simple and 
convinient way to do what we were trying to do.

Also, the instructions say that the buttons under the board should be 
interactable icons, I felt that that would be less clear for the user however, 
as I could not come up with a descriptive icon for clearing a board. So I 
instead opted for using labeled buttons. I used this to my advantage, as
when testing I realized that sometimes it was hard to remember if I was in 
flag mode or regular mode, so I had the text on the button change to reflect
the mode change.

With that in mind, I still chose to make interactable icons, those being the 
flowers that can be used to restart the game if you click the one at the top
of the page, or clear the history by clicking the one under the "History" label.
Though that second button wasn't required.

While looking at the wikipedia pages for different versions of minesweeper, I
came across a themed version called "Field Of Flowers" or "Flower Field". This
version was made for the italian localizations of the game, as some people 
voiced their concerns with the game being insensitive towards those who passed
away in minefields. I liked the idea and the theme, so I decided to use the 
theme in my implementation! 

This was a fun project, and although I'm still not feeling at home with react,
I do feel a lot more comfortable with the concepts. 
