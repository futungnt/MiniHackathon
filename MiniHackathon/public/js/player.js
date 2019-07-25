window.onload = () => {
    document.querySelector('.input-body').addEventListener('submit', (event) => {
        event.preventDefault();
        var p1 = document.querySelector(`#player1`).value;
        var p2 = document.querySelector(`#player2`).value;
        var p3 = document.querySelector(`#player3`).value;
        var p4 = document.querySelector(`#player4`).value;
        //console.log(p1);
        if ((p1.length != 0) && (p2.length != 0) && (p3.length != 0) && (p4.length != 0)) {
            console.log("a");
            fetch('./create-new-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    player1: p1,
                    player2: p2,
                    player3: p3,
                    player4: p4,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    window.location.href = `http://localhost:8080/games/${data.id}`;
                })
                .catch((error) => {
                    if (error) {
                        console.log(error);
                        window.alert(error.message);
                    }
                });
        } else {
            console.log('pls entera');
            document.querySelector('.noti').insertAdjacentHTML('beforeend',
                `<div class="alert alert-danger" role="alert" > Please enter the player names!</div>`);
        }

    });
    document.querySelector('.input-body').addEventListener("input", () => {
        var x = document.querySelector('.noti');
        if (x.hasChildNodes()) {
            x.removeChild(x.lastChild);
        }
    });
}