class InvalidForm(Exception):
    def __init__(self):
        self.message = "Formulário inválido. Por favor, preencha todos os campos corretamente."
        super().__init__(self.message)