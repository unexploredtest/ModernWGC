import numpy as np
import numexpr as ne
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
import mpld3

def figure_generator(functionName: str) -> Figure:
    x = np.linspace(-5,5,100)
    y = ne.evaluate(functionName)
    
    fig, ax = plt.subplots()
    
    ax.spines['left'].set_position('center')
    ax.spines['bottom'].set_position('zero')
    ax.spines['right'].set_color('none')
    ax.spines['top'].set_color('none')
    ax.xaxis.set_ticks_position('bottom')
    ax.yaxis.set_ticks_position('left')
    ax.grid()
    
    ax.plot(x,y, 'r')
    
    return fig

def fig_dict(fig: Figure) -> dict:
    return mpld3.fig_to_dict(fig)