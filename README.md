# "Jak dojadę" do robłoty!

## Co to jest

Jest to proste narzędzie CLI do sprawdzania czasu dojazdu do pracy w dniu 03.07.19 o godzinie 07:30 na podstawie współrzędnych przekopiowanych z Google Maps w formacie:
`50.060716, 19.933594`.

## Instalacja

`npm install`

## Przykład

```
$ node main.js 50.060716, 19.933594
Czas dojazdu do Akamai: 33 min.
Czas dojazdu do Ericsson: 29 min.
```

## FAQ

### Skąd dostanę te współrzędne?

Po kliknięciu w punkt w Google Maps pokazuje się karta wraz z informacją na temat miejsca na dole strony. Pod nazwą punktu i adresem zawarte są wymagane współrzędne, które trzeba bezpośrednio tu skopiować.

### Po kliknięciu w punkt nie ma współrzędnych!

Prawdopodobnie kliknąłeś w istniejący marker np. jakieś miejsce publiczne. W takim wypadku trzeba kliknąć w jakieś miejsce obok, poza markerem.

### Czo? Kamil, nudzi ci się?

Tak.
