const InitialPassword = document.querySelector('input[name=password]')

const SecondPassword = document.querySelector('input[name=ConPassword]')


document.querySelector('#Env').addEventListener('click', e => {
    if (InitialPassword.value !== SecondPassword.value) {
        alert('Senhas Diferentes')
        e.preventDefault()

    } else if (InitialPassword.value.length < 6) {
        alert('Senha Precisa ter 6 ou mais caracteres')
        e.preventDefault()
    }
})