# Comeback Mechanics

![Comeback Mechanics Banner](./docs/assets/banner.png)

<br><br>

## Project Links

- [Player's Mobile Portal](https://brave-shark-9g6q3j-dev-ed.my.site.com/comebackmechanics/)

- [Code Documentation - GitHub Page]()

<br><br>

## Project Progress

- [x] Player object

- [x] Player tab

- [x] Player fields

- [x] comeback app

- [x] digital site

- [x] update profile for access to apex

- [x] tournament results

- [x] date of event

- [x] player

- [x] points earned

- [x] tournament type (GLC or Standard)

- [x] pull all tag challenges & display them

- [x] Creating a Tag Challenge updates ranks

- [x] after creating a tag challenge, that page updates with new history log

- [x] if someone defends their tag, the history needs to reflect that (maybe a checkbox if defended?)

- [x] clicking on a player's row opens their pop-up modal

<br><br>

## Order of Operations for updating Rank

(the thinking is that these will be created in an order that makes the trigger unnecessary for TC records)

- [x] Path #1
User creates a Tag Challenge record on LWC
apex method handles the creating of the TC record & also updates both players' ranks

- [ ] Path #2
Omar creates Tournament Results records in Salesforce
Trigger fires to update the player's rank based on the TR record 