///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Mesure REM/////
///////////////////////////////////////////////////////////////////////////////////////////////
POUR AVOIR MOINS DE BOULOT A FAIRE COTÉ MOBILES.


PARCE QUE PAR DEFAUT , 1REM = 16PX


on peut simplement faire ce changement:

html {
  font-size: 6.25%
}


h1{
  font-size: 22rem; == 22px
}


OU POUR S ASSURER QUE DES TRUCS EXTERNES SOIT VISIBLE...

DONC
html {
    font-size: 62.5%; /* Ré-équilibrage du Rem face au Pixel pour des calculs simples */
}
/* Exemple d'application */
p {
    font-size: 22px; /* Pour les navigateurs qui ne supportent pas le Rem */
    font-size: 2.2rem; /* Pour les navigateurs « Responsive » */
}
