# JobChaser

JobChaser är en webbapplikation som låter användare söka efter aktuella jobb, med möjligheter att filtrera och få förslag under sökningen.

## Teknologier

- Redux Toolkit
- React
- Axios
- Firebase

## Resonemang

Kodbasen är välstrukturerad med mappar som innehåller alla tillhörande komponenter. I projektet har jag använt TypeScript tillsammans med Firebase för autentisering och börjat använda Firestore för datalagring. Firestore-delen blev dock inte helt färdig under projektets gång, så där finns det mycket förbättringspotential.

Jag är nöjd med jobbsökningen i huvudmenyn, där användaren först måste ange vilken stad de vill söka jobb i för att undvika irrelevanta annonser från andra städer. Sökfältet ger förslag medan man skriver, men den funktionen kan förbättras då förslagen inte alltid är relevanta. För att göra inläsningen av jobb snyggare har jag lagt till en skeleton-loader.

Framtida förbättringar för detta projekt inkluderar bättre hantering av Firebase-autentisering och datalagring i Firestore, samt förbättrad felhantering för Axios-anrop så att användaren blir meddelad när ett fel uppstår.

## Extra funktioner

- En "scroll to top"-knapp som visas när användaren skrollar ner bland jobben och tar användaren tillbaka till toppen av sidan vid klick.
- Filtrering av jobbtyper: deltidsjobb, heltidsjobb eller alla jobb.
- Förslag visas i sökfältet medan användaren skriver, vilket gör det lättare att hitta relevanta jobb.
- kunna lägga till vilken stad man vill göra jobbsökninen i på första sidan.

