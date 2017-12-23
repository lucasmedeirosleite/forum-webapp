# ~/.bashrc: executed by bash(1) for non-login shells.
# This file configures some aliases and the prompt of
# our web container

export LS_OPTIONS='--color=auto'
export SHELL=/bin/bash
eval "`dircolors`"

export PS1="\u\[\e[32m\]@\[\e[m\]\[\e[34m\]\h\[\e[m\]:\w \[\e[36m\]⇒\[\e[m\] "
