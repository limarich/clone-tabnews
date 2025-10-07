# 🚀 Troca automática da versão do Node com base no arquivo .nvmrc
load-nvmrc() {
  if [ -f .nvmrc ]; then
    nvm use --silent > /dev/null
  else
    nvm use default --silent > /dev/null
  fi
}
# 💡 Mostra o shell atual e sua versão
show_shell_version() {
  if [ -n "$ZSH_VERSION" ]; then
    echo "🧠 Shell atual: Zsh versão $ZSH_VERSION"
  elif [ -n "$BASH_VERSION" ]; then
    echo "🧠 Shell atual: Bash versão $BASH_VERSION"
  elif [ -n "$FISH_VERSION" ]; then
    echo "🧠 Shell atual: Fish versão $FISH_VERSION"
  else
    echo "🧠 Shell atual: Desconhecido"
  fi
}

# ⚡️ Detecta o shell atual e adiciona o hook corretamente
if [ -n "$ZSH_VERSION" ]; then
  autoload -U add-zsh-hook
  add-zsh-hook chpwd load-nvmrc
elif [ -n "$BASH_VERSION" ]; then
  cd() { builtin cd "$@" || return; load-nvmrc; }
fi

# ✅ Executa uma vez ao abrir o terminal
show_shell_version
load-nvmrc
