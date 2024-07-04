### Moje komentarze dotyczące projektu

Oto kilka wyjaśnień, dlaczego podjąłem takie, a nie inne decyzje. Mając dostęp do płatnych wersji API danych giełdowych, aplikacja wyglądałaby nieco inaczej.

- **Renderowanie po stronie serwera (SSR)**: Ze względu na ograniczenia darmowych wersji API, wiele stron zostało utworzonych z wykorzystaniem SSR. Moim zdaniem, w aplikacji produkcyjnej strony te powinny być renderowane po stronie klienta, by zapewnić świeże dane. W tym przypadku najlepszym rozwiązaniem było SSR z incrementem co 24 godziny, aby dostarczać codziennie nowe dane.
- **Statystyki zapytań do API**: Ze względu na ograniczenia, podstrona ze statystykami dotyczącymi zapytań do API nie miała sensu, ponieważ większość contentu generowana jest po stronie serwera. Natomiast przygotowałem gotowe endpointy, aby można było uznać to za wykonane. Wystarczyłoby dodać wywołanie do naszego gotowego API przy każdym fetchu danych z API Alpha Vantage (POST /requests GET /stats).
- **Wysyłka Maili**: W darmowej wersji API Alpha Vantage istnieje ograniczenie requstów per dzień dlatego nie opublikowałem crona odpowiedzialnego za wysyłkę maili przy ustawionych alertach. Zaimplementowałem jedynie przykładowy kod w folderze functions takiego crona. Ze względu na ograniczenie ilości requestów cron sypałby błędami.
- **Unity testy**: Stworzyłem kilka poglądowych unit testów, by pokazać, że wiem o co chodzi. Nie skupiałem się na wysokim % coverage ze względu na ograniczenie czasowe.
- **Zmockowane Dane**: By ominąć wszystkie ograniczenia aplikacja postawiona jest na Mockach pobranych bezpośrednio z API i zapisanych w plikacj .json foldrze /src/mocks. Stworzyłem flagę USE_MOCKS dzięki której można to wyłączyć po zmianie jednego enva.
- **Używane spółki**: Specjalnie ograniczyłem aplikacje do 6-ciu spółek, których symbole są shardcodowane w pliku do fetchowania danych. Oczywiście nie jest to produkcyjne podejście i w realnej aplikacji ograniczenie by nie istniało :)

## Moje workflow

Zapisałem krok po kroku całe flow tworzenia tej aplikacji, byście mogli poznać mój schemat pracy podczas tworzenia aplikacji od zera.

1. Setup projektu Next.js, dodanie niezbędnych paczek, konfiguracja Firebase oraz AdminSDK.
2. Research giełdowych API, wybór i testowanie API Alpha Vantage, konfiguracja w projekcie.
3. Integracja logowania oraz rejestracji Firebase.
4. Dodanie HOC'y withAuth oraz redirectIfAuthenticated do zarządzania stanem zalogowanego użytkownika (zablokowanie możliwości ominięcia logowania przez wejście bezpośrednio z linku).
5. Dodanie wszystkich route'ów do projektu z placeholderami.
6. Stworzenie pierwszych stron na realnych danych - SSR ze względu na ograniczenia API na darmowym trialu. W realnej aplikacji strony z prezentacją różnych indeksów spółek powinny być renderowane po stronie klienta ze streamem aktualnych danych z giełdy, aby użytkownik mógł mieć podgląd na żywo.
7. Stworzenie endpointów API do ustawienia alertów.
8. Frontend dla alertów.
9. Stworzenie przykładowego crona (folder functions), który odświeżałby się co 15 minut, zaczytywał wszystkie alerty i wysyłał użytkownikom informacje mailem.
10. Stworzenie przykładowego endpointu POST /requests do śledzenia użycia planu przez użytkownika (liczenie ilości wykorzystanych przez niego requestów w aplikacji).
11. Dodanie przykładowego endpointu GET /stats, który zwróci statystyki, które mogłyby być zaprezentowane na podstronie ze statystykami (nieobowiązkowe wymaganie 5).
12. Refactor kodu, wyodrębnienie różnych komponentów (typu Input.tsx), aby kod był czystszy i bardziej przejrzysty.
13. Ostylowanie całej aplikacji, dodanie responsywności.
14. Dodanie kilku przykładowych testów jednostkowych.
15. Ustawienie deploymentu aplikacji.
